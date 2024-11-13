import datetime
from typing import List

from lead_server.models import User
from lead_server.services.database_service import DatabaseService
from fastapi import APIRouter, Request, Response

from lead_server.util import jwt_gateway_factory
from pydantic import BaseModel


class AttemptResponse(BaseModel):
    id: int
    start_date: datetime.datetime
    is_completed: bool
    quiz_id: int


def get_attempt_router(db_service: DatabaseService, jwt_secret: str):
    router = APIRouter(prefix="/api/attempts")
    jwt_required = jwt_gateway_factory(db_service, jwt_secret)

    @router.get('/', response_model=List[AttemptResponse])
    @jwt_required
    async def get_attempts_for_user(request: Request, response: Response):
        user = request.state.user
        attempt = await db_service.get_attempts_by_user_id(user.id)
        return attempt

    @router.post('/start/{quiz_id}', response_model=AttemptResponse)
    @jwt_required
    async def start_attempt(request: Request, response: Response):
        user = request.state.user
        quiz_id = request.path_params['quiz_id']
        try:
            attempt = await db_service.start_attempt(user.id, quiz_id)
            return attempt
        except Exception as e:
            return Response(status_code=400, content="Invalid quiz")

    @router.post('/submit/{attempt_id}')
    @jwt_required
    async def submit_attempt(request: Request, response: Response):
        user = request.state.user
        attempt_id = request.path_params['attempt_id']
        try:
            attempt = await db_service.submit_attempt(user.id, attempt_id, await request.json()) #TODO: Add score calculation logic when time comes
            return Response(status_code=200)
        except Exception as e:
            return Response(status_code=400, content="Invalid attempt")

    return router