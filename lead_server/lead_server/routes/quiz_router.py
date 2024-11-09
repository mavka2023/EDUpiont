import datetime
from typing import Union

from lead_server.models import User, Quiz
from lead_server.services.database_service import DatabaseService
from fastapi import APIRouter, Request, Response
from pydantic import BaseModel
from lead_server.util import jwt_gateway_factory


class AnswerResponse(BaseModel):
    id: int
    question_id: int
    text: str


class QuestionResponse(BaseModel):
    id: int
    quiz_id: int
    question: str
    resource_url: Union[str, None]
    answers: list[AnswerResponse]


class QuizResponse(BaseModel):
    id: int
    title: str
    valid_until: datetime.datetime
    time_to_complete: datetime.time
    questions: list[QuestionResponse]


class QuizResponseList(BaseModel):
    id: int
    title: str
    valid_until: datetime.datetime
    time_to_complete: datetime.time


def get_quiz_router(db_service: DatabaseService, jwt_secret: str):
    jwt_required = jwt_gateway_factory(db_service, jwt_secret)
    quiz_router = APIRouter(prefix="/api/quizzes")

    @quiz_router.get("/{quiz_id}", response_model=QuizResponse)
    @jwt_required
    async def get_quiz(quiz_id: int, request: Request):
        user = request.state.user
        quiz = await db_service.get_quiz_by_id(quiz_id, user.id)
        return quiz

    @quiz_router.get("/", response_model=list[QuizResponseList])
    @jwt_required
    async def get_quizzes(request: Request):
        user = request.state.user
        quizzes = await db_service.get_quizzes(user.id)
        return quizzes

    @quiz_router.post("/")
    @jwt_required
    async def create_quiz(request: Request):
        user = request.state.user
        quiz = await db_service.create_quiz(await request.json(), user.id)
        return quiz

    @quiz_router.put("/{quiz_id}")
    @jwt_required
    async def update_quiz(quiz_id: int, request: Request):
        user = request.state.user
        quiz = await db_service.update_quiz(quiz_id, await request.json(), user.id)
        return quiz

    @quiz_router.delete("/{quiz_id}")
    @jwt_required
    async def delete_quiz(quiz_id: int, request: Request):
        user = request.state.user
        await db_service.delete_quiz_by_id(quiz_id, user.id)
        return Response(status_code=204)

    return quiz_router
