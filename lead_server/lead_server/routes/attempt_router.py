from lead_server.models import User
from lead_server.services.database_service import DatabaseService
from fastapi import APIRouter, Request, Response

from lead_server.util import jwt_gateway_factory


def get_user_router(db_service: DatabaseService, jwt_secret: str):
    jwt_required = jwt_gateway_factory(db_service, jwt_secret)
    attempt_router = APIRouter(prefix="/api/attepmpts")

    @attempt_router.get("/")
    @jwt_required
    async def get_user_by_id(request: Request, response: Response):
        user = await db_service.get_user_by_id(request.state.user_id)
        return user.attempts

    return attempt_router
