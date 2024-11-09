from lead_server.models import User
from lead_server.services.database_service import DatabaseService
from fastapi import APIRouter, Request, Response
from lead_server.util import jwt_gateway_factory
from pydantic import BaseModel

class ResponseNote(BaseModel):
    id: int
    title: str
    text: str

def get_note_router(db_service: DatabaseService, jwt_secret: str):
    jwt_required = jwt_gateway_factory(db_service, jwt_secret)

    router = APIRouter(prefix="/api/notes")

    @router.get("/", response_model=list[ResponseNote])
    @jwt_required
    async def get_notes(request: Request, response: Response):
        user = request.state.user
        return await db_service.get_notes_by_user_id(user.id)

    @router.post("/", response_model=ResponseNote)
    @jwt_required
    async def create_note(request: Request, response: Response):
        user = request.state.user
        data = await request.json()
        note = await db_service.add_note_to_user(data,user.id)
        return note

    @router.put("/{note_id}", response_model=ResponseNote)
    @jwt_required
    async def update_note(request: Request, response: Response):
        note_id = int(request.path_params['note_id'])
        user = request.state.user
        data = await request.json()
        note = await db_service.update_note_by_id(note_id, data)
        return note

    return router
