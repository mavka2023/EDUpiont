import datetime

from lead_server.models import User
from lead_server.services.database_service import DatabaseService
from fastapi import APIRouter, Request, Response
from lead_server.util import jwt_gateway_factory
from pydantic import BaseModel


class ResponseEvent(BaseModel):
    id: int
    text: str
    remind_datetime: datetime.datetime


def get_calendar_router(db_service: DatabaseService, jwt_secret: str):
    jwt_required = jwt_gateway_factory(db_service, jwt_secret)

    router = APIRouter(prefix="/api/calendar/events")

    @router.get("/", response_model=list[ResponseEvent])
    @jwt_required
    async def get_events(request: Request, response: Response):
        user = request.state.user
        return await db_service.get_events_by_user_id(user.id)

    @router.post("/", response_model=ResponseEvent)
    @jwt_required
    async def create_event(request: Request, response: Response):
        user = request.state.user
        data = await request.json()
        event = await db_service.add_event_to_user(data, user.id)
        return event

    @router.put("/{event_id}", response_model=ResponseEvent)
    @jwt_required
    async def update_event(request: Request, response: Response):
        event_id = int(request.path_params['event_id'])
        user = request.state.user
        data = await request.json()
        note = await db_service.update_event_by_id(event_id, data, user.id)
        return note

    @router.delete("/{event_id}")
    @jwt_required
    async def delete_event(request: Request, response: Response):
        event_id = int(request.path_params['event_id'])
        user = request.state.user
        await db_service.delete_event_by_id(event_id, user.id)
        return Response(status_code=204)

    return router
