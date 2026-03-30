from fastapi import APIRouter, HTTPException

from models.schemas import ChatRequest, ChatResponse
from services.chatbot import chat

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="message cannot be empty")
    try:
        return chat(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
