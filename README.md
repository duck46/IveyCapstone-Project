# FSRA Auto Insurance Underwriting Rule Assessment Tool

An AI-assisted regulatory evaluation prototype for the Financial Services Regulatory Authority of Ontario (FSRA). Built for the Ivey Capstone project.

> **For Academic Use Only.** This tool does not represent the views, positions, or policies of FSRA. All assessments are AI-generated and must be validated by qualified human reviewers.

---

## What It Does

Evaluates proposed auto insurance underwriting decline rules against FSRA's 4-level regulatory framework:

| Level | Name | Required? |
|-------|------|-----------|
| 1 | Basic Compliance (legislation, Human Rights Code, existing market rules) | **Required** |
| 2 | Principles & Fair Consumer Outcomes | Stretch |
| 3 | Subjectivity, Arbitrariness & Risk Relationship | Stretch |
| 4 | Public Policy Filter | Stretch |

Also includes an embedded **Regulatory Knowledge Chatbot** powered by Claude.

---

## Stack

- **Backend:** Python 3.11 + FastAPI + OpenRouter (`nvidia/nemotron-super-49b-v1:free`)
- **Frontend:** React 18 + Vite + TailwindCSS

---

## Setup

### 1. Clone and configure

```bash
git clone <repo-url>
cd IveyCapstone-Project
cp .env.example .env
# Edit .env and add your OPENROUTER_API_KEY
```

### 2. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# API runs on http://localhost:8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## Usage

1. Open `http://localhost:5173`
2. Enter a proposed underwriting decline rule
3. Optionally add insurer name, supporting rationale, and whether actuarial data was provided
4. Click **Evaluate Rule** — Claude evaluates the rule across all 4 levels
5. Review the assessment with per-level findings, referenced legislation, and detected issues
6. Use the **Human Reviewer Decision** panel to approve, decline, or request more info
7. Click **Ask Regulatory Assistant** to open the chatbot for regulatory Q&A

---

## Example Rules to Try

**Likely DECLINE:**
- "Deny insurance to anyone who drives a red car"
- "Deny insurance to any driver who has never had auto insurance before"
- "Deny insurance to drivers who were accused of a crime but not convicted"

**Likely APPROVE:**
- "2 or more at-fault accidents in the preceding 3 years"
- "1 or more Criminal Code convictions in the preceding 3 years"
- "Any automobile used for commercial purposes"

---

## Project Structure

```
IveyCapstone-Project/
├── backend/
│   ├── main.py                  # FastAPI app
│   ├── routers/
│   │   ├── evaluate.py          # POST /api/evaluate
│   │   └── chat.py              # POST /api/chat
│   ├── services/
│   │   ├── evaluator.py         # Claude evaluation (4-level framework)
│   │   └── chatbot.py           # Claude regulatory chatbot
│   ├── data/
│   │   ├── approved_rules.py    # Known approved rules (precedent)
│   │   ├── legislation.py       # Ontario legislation references
│   │   └── principles.py        # FSRA principles & rejection reasons
│   ├── models/
│   │   └── schemas.py           # Pydantic models
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RuleSubmissionForm.jsx
│   │   │   ├── ComplianceDashboard.jsx
│   │   │   ├── AssessmentPanel.jsx
│   │   │   ├── FlaggingBadges.jsx
│   │   │   ├── DecisionWorkflow.jsx
│   │   │   └── ChatbotPanel.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── .env.example
```
