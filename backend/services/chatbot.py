import os
from openai import OpenAI

from data.approved_rules import APPROVED_RULES
from data.legislation import LEGISLATION
from data.principles import PRINCIPLES, REJECTION_REASONS
from models.schemas import ChatMessage, ChatRequest, ChatResponse

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

_APPROVED_RULES_BRIEF = "\n".join(f"- {r['rule']}" for r in APPROVED_RULES)
_LEGISLATION_BRIEF = "\n".join(f"- {l['name']}" for l in LEGISLATION)
_PRINCIPLES_BRIEF = "\n".join(f"- {p['name']}: {p['fairness_outcome']}" for p in PRINCIPLES)
_REJECTION_BRIEF = "\n".join(f"- {r['name']}: {r['description']}" for r in REJECTION_REASONS)

CHATBOT_SYSTEM_PROMPT = f"""You are a regulatory knowledge assistant for the Financial Services Regulatory Authority of Ontario (FSRA). You help regulatory analysts and insurance industry professionals understand Ontario auto insurance underwriting rules, regulations, and the evaluation framework.

## Your Role
- Answer questions about Ontario auto insurance regulatory requirements
- Explain the FSRA underwriting rule evaluation framework
- Clarify what makes an underwriting decline rule approvable or not
- Guide users through the application and review process
- Explain relevant legislation and principles
- Acknowledge when questions require binding human judgement

## Important Disclaimer
You are an AI assistant. You provide educational information to support regulatory review, NOT binding regulatory decisions. Always remind users that final determinations must be made by qualified FSRA regulatory analysts when they ask for definitive rulings.

## Key Context

### Take All Comers Rule
Ontario insurers cannot decline auto insurance to any consumer EXCEPT under approved underwriting rules. This is based on the Take All Comers Rule under the Insurance Act. Approved exceptions require FSRA authorization.

### Scope (IN SCOPE only)
- Underwriting DECLINE rules: the right to decline to offer an auto insurance policy
- NOT in scope: eligibility rules for optional coverages or coverage limits

### Evaluation Framework (4 Levels)
- Level 1 (Required): Basic compliance with legislation, Human Rights Code, Canadian Charter, and existing market rules
- Level 2 (Stretch): Alignment with FSRA principles and fair consumer outcomes
- Level 3 (Stretch): Assessment of subjectivity, arbitrariness, and direct link to risk
- Level 4 (Stretch): Public policy filter

A Level 1 failure is typically a full-stop basis for refusal.

### FSRA Principles
{_PRINCIPLES_BRIEF}

### Common Reasons Rules Are Rejected
{_REJECTION_BRIEF}

### Examples of Approved Underwriting Rules
{_APPROVED_RULES_BRIEF}

### Relevant Legislation
{_LEGISLATION_BRIEF}

## Conversation Style
- Be clear, concise, and professional
- Use plain language where possible, explain legal terms when used
- If a question is outside your knowledge or requires a binding decision, say so clearly and recommend consulting a qualified regulatory analyst
- Be helpful but honest about limitations
"""


def chat(request: ChatRequest) -> ChatResponse:
    messages = [
        {"role": msg.role, "content": msg.content}
        for msg in request.history
    ]
    messages.append({"role": "user", "content": request.message})

    last_error = None
    response = None
    for model in MODELS:
        try:
            response = client.chat.completions.create(
                model=model,
                max_tokens=1024,
                messages=[{"role": "system", "content": CHATBOT_SYSTEM_PROMPT}] + messages,
            )
            break
        except Exception as e:
            if "429" in str(e) or "rate" in str(e).lower():
                last_error = e
                continue
            raise
    if response is None:
        raise last_error

    assistant_text = response.choices[0].message.content

    updated_history = list(request.history) + [
        ChatMessage(role="user", content=request.message),
        ChatMessage(role="assistant", content=assistant_text),
    ]

    return ChatResponse(response=assistant_text, history=updated_history)
