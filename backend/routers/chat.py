from fastapi import APIRouter, HTTPException
import logging

from models.schemas import ChatRequest, ChatResponse
from services.chatbot import chat

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="message cannot be empty")
    try:
        return chat(request)
    except Exception as e:
        logger.error("Chat error: %s", e)
        raise HTTPException(status_code=500, detail="Chat failed. Please try again.")
