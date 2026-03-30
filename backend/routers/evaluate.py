from fastapi import APIRouter, HTTPException

from models.schemas import EvaluateRequest, EvaluateResponse
from services.evaluator import evaluate_rule
from data.approved_rules import APPROVED_RULES

router = APIRouter()


@router.post("/evaluate", response_model=EvaluateResponse)
def evaluate(request: EvaluateRequest):
    if not request.rule_text.strip():
        raise HTTPException(status_code=400, detail="rule_text cannot be empty")
    try:
        return evaluate_rule(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/rules/examples")
def get_example_rules():
    return {"rules": APPROVED_RULES}
