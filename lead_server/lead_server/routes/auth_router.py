from datetime import datetime

from lead_server.models import User
from lead_server.services.database_service import DatabaseService
from fastapi import APIRouter, Request, Response
from jwt import encode


def get_auth_router(db_service: DatabaseService, jwt_secret: str):
    router = APIRouter(prefix="/api/auth")

    @router.post("/login")
    async def login(request: Request, response: Response):
        data = await request.json()
        user = await db_service.get_user_by_email(data.get("email"))
        if user is None:
            response.status_code = 401
            return {"error": "Invalid credentials"}
        if user.password_hash != User.hash_password(data.get("password")):
            response.status_code = 401
            return {"error": "Invalid credentials"}
        return {
            "token": encode({
                "user_id": user.id,
                "user_email": user.email,
                "username": user.username,
                "cre_timestamp": datetime.now().timestamp()
            }, jwt_secret)
        }

    return router
