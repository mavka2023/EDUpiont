from functools import wraps

import jwt
from fastapi import HTTPException
import time


def jwt_gateway_factory(db_service, JWT_SECRET, JWT_EXPIRATION=24*3600):
    def jwt_auth_required_decorator(function):
        @wraps(function)
        async def jwt_auth_wrapper(*args, **kwargs):
            try:
                request = kwargs["request"]
                token = request.headers.get("Authorization").split(" ")[1]
                payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
                if payload["cre_timestamp"] + JWT_EXPIRATION < time.time():
                    return HTTPException(401, "Token expired")
                user = await db_service.get_user_by_id(payload["user_id"])
                if user is None:
                    return HTTPException(401, "Invalid token")
                request.state.user = user
                return await function(*args, **kwargs)
            except Exception as e:
                raise HTTPException(status_code=401, detail="Invalid token")
        return jwt_auth_wrapper
    return jwt_auth_required_decorator
