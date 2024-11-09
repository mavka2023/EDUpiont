from lead_server.models import User
from lead_server.services.database_service import DatabaseService
from fastapi import APIRouter, Request, Response

from lead_server.util import jwt_gateway_factory


def get_user_router(db_service: DatabaseService, jwt_secret: str):
    jwt_required = jwt_gateway_factory(db_service, jwt_secret)
    user_router = APIRouter(prefix="/api/users")

    @user_router.get("/{user_id}")
    @jwt_required
    async def get_user_by_id(user_id: int, request: Request, response: Response):
        if request.state.user.id != user_id:
            response.status_code = 403
            return {"error": "You are not authorized to access this resource"}
        return await db_service.get_full_user_by_id(user_id)

    @user_router.post("/create")
    async def create_user(request: Request):
        user = await request.json()
        user['password_hash'] = User.hash_password(user['password'])
        user = User.from_dict(**user)
        user_id = await db_service.add_user(user)
        return Response(status_code=201, content=f"{user_id}")

    return user_router
