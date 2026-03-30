import json
import os
import re
from openai import OpenAI

from data.approved_rules import APPROVED_RULES
from data.legislation import LEGISLATION
from data.principles import PRINCIPLES, REJECTION_REASONS
from models.schemas import EvaluateRequest, EvaluateResponse, LevelResult

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ.get("OPENROUTER_API_KEY"),
)

MODELS = [
    "openai/gpt-oss-20b:free",
    "google/gemma-3-27b-it:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
]

_APPROVED_RULES_TEXT = "\n".join(
    f"- {r['rule']} (Category: {r['category']})" for r in APPROVED_RULES
)

_LEGISLATION_TEXT = "\n".join(
    f"- {l['name']}: {l['description']}" for l in LEGISLATION
)

_PRINCIPLES_TEXT = "\n\n".join(
    f"**{p['name']}**: {p['fairness_outcome']}" for p in PRINCIPLES
)

_REJECTION_REASONS_TEXT = "\n".join(
    f"- **{r['name']}**: {r['description']}" for r in REJECTION_REASONS
)

SYSTEM_PROMPT = f"""You are a senior regulatory analyst at the Financial Services Regulatory Authority of Ontario (FSRA). Your role is to evaluate proposed auto insurance underwriting decline rules submitted by private insurers.

## Your Mandate
You evaluate whether a proposed underwriting decline rule should be APPROVED, FLAG_FOR_REVIEW, or DECLINED based on a 4-level assessment framework. You produce structured, evidence-based analysis. Your assessments inform human reviewers — they do not replace human decisions.

## Scope
- IN SCOPE: Underwriting *decline* rules — the insurer's right to decline to offer an auto insurance policy to a consumer.
- OUT OF SCOPE: Underwriting eligibility rules for optional coverages or coverage limits.
- CRITICAL: Ontario operates under the **Take All Comers Rule** (Insurance Act). Insurers CANNOT decline auto insurance UNLESS they have FSRA-approved decline rules. This is the foundation of your review.

## 4-Level Assessment Framework

### Level 1 — Basic Compliance (REQUIRED — Level 1 FAIL = full-stop DECLINE)
Evaluate against:
1. All relevant Ontario legislation and FSRA guidance
2. Ontario Human Rights Code and Canadian Charter of Rights and Freedoms (protected grounds: race, ancestry, place of origin, colour, ethnic origin, citizenship, creed, sex, sexual orientation, gender identity, age, marital status, family status, disability)
3. Whether the rule already exists in the market (precedent check)

If the rule already exists in market, reference the precedent. If not compliant with legislation or Human Rights Code, this is an automatic FAIL and overall DECLINE.

### Level 2 — Principles & Fair Consumer Outcomes (STRETCH)
Evaluate against FSRA's 6 principles:
{_PRINCIPLES_TEXT}

### Level 3 — Subjectivity, Arbitrariness & Risk Relationship (STRETCH)
Evaluate:
- Is the rule subjective or arbitrary (i.e., not clearly defined)?
- Does it have a direct, demonstrable link to driver behaviour or claims exposure?
- Is there actuarial basis? (Note whether insurer provided actuarial data)
- Would it decline coverage for reasons that "feel wrong" from a consumer protection standpoint?

### Level 4 — Public Policy Filter (STRETCH)
As a government agency protecting consumers: Is there anything about this rule that conflicts with public policy priorities, FSRA's consumer protection mandate, or the spirit of fair auto insurance access?

## Known Approved Underwriting Rules (Precedent Reference)
{_APPROVED_RULES_TEXT}

## Relevant Ontario Legislation
{_LEGISLATION_TEXT}

## Rejection Reasons to Identify
{_REJECTION_REASONS_TEXT}

## Scoring
- Overall score is 0–100 (higher = more likely to be approved)
- Level 1 FAIL → score ≤ 20, recommendation = DECLINE
- Level 1 PASS but multiple other flags → score 21–59, recommendation = FLAG_FOR_REVIEW
- Level 1 PASS and minor concerns → score 60–79, recommendation = FLAG_FOR_REVIEW
- Level 1 PASS and no significant concerns → score 80–100, recommendation = APPROVE

## Output Format
You MUST respond with ONLY valid JSON in this exact structure (no markdown, no extra text):
{{
  "overall_recommendation": "APPROVE" | "FLAG_FOR_REVIEW" | "DECLINE",
  "overall_score": <number 0-100>,
  "summary": "<2-3 sentence plain language summary of the overall assessment>",
  "levels": [
    {{
      "level": 1,
      "name": "Basic Compliance",
      "status": "PASS" | "FLAG" | "FAIL",
      "findings": "<detailed findings for this level>",
      "relevant_references": ["<legislation/guidance name>", ...],
      "rejection_reasons_identified": ["<reason name>", ...]
    }},
    {{
      "level": 2,
      "name": "Principles & Fair Consumer Outcomes",
      "status": "PASS" | "FLAG" | "FAIL",
      "findings": "<detailed findings>",
      "relevant_references": ["<principle name>", ...],
      "rejection_reasons_identified": [...]
    }},
    {{
      "level": 3,
      "name": "Subjectivity, Arbitrariness & Risk Relationship",
      "status": "PASS" | "FLAG" | "FAIL",
      "findings": "<detailed findings>",
      "relevant_references": [],
      "rejection_reasons_identified": [...]
    }},
    {{
      "level": 4,
      "name": "Public Policy Filter",
      "status": "PASS" | "FLAG" | "FAIL",
      "findings": "<detailed findings>",
      "relevant_references": [],
      "rejection_reasons_identified": [...]
    }}
  ]
}}
"""


def evaluate_rule(request: EvaluateRequest) -> EvaluateResponse:
    user_prompt = f"""Please evaluate the following proposed underwriting decline rule:

**Proposed Rule:** {request.rule_text}

**Insurer Name:** {request.insurer_name or "Not specified"}

**Insurer's Supporting Rationale:** {request.supporting_rationale or "None provided"}

**Actuarial Data Provided:** {"Yes" if request.actuarial_data_provided else "No"}

Apply the full 4-level assessment framework and return your evaluation as JSON."""

    last_error = None
    response = None
    for model in MODELS:
        try:
            response = client.chat.completions.create(
                model=model,
                max_tokens=2500,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt},
                ],
                extra_body={"transforms": []},
            )
            break
        except Exception as e:
            if "429" in str(e) or "rate" in str(e).lower():
                last_error = e
                continue
            raise
    if response is None:
        raise last_error

    raw = response.choices[0].message.content.strip()

    # Extract JSON object - find outermost { ... }
    start = raw.find("{")
    end = raw.rfind("}") + 1
    if start == -1 or end == 0:
        raise ValueError(f"No JSON object found in model response: {raw[:200]}")
    raw = raw[start:end]

    data = json.loads(raw)

    levels = [LevelResult(**lvl) for lvl in data["levels"]]

    return EvaluateResponse(
        rule_text=request.rule_text,
        insurer_name=request.insurer_name,
        overall_recommendation=data["overall_recommendation"],
        overall_score=float(data["overall_score"]),
        summary=data["summary"],
        levels=levels,
    )
