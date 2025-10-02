from fastapi import APIRouter
from pydantic import BaseModel
from app.services.llm_service import generate_answer

router = APIRouter()

class QuestionRequest(BaseModel):
    question: str

@router.get("/")
def read_root():
    return {"Hello": "World"}

@router.post("/ask")
def ask_question(request: QuestionRequest):
    return generate_answer(request.question)
