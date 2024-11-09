from lead_server.models import User
from lead_server.services.database_service import DatabaseService
from fastapi import APIRouter, Request, Response
from lead_server.util import jwt_gateway_factory
from pydantic import BaseModel


class ResponseFlashcard(BaseModel):
    id: int
    text_front: str
    text_back: str


class ResponseFlashcardDeck(BaseModel):
    id: int
    title: str
    flashcards: list[ResponseFlashcard]


def get_flashcard_router(db_service: DatabaseService, jwt_secret: str):
    jwt_required = jwt_gateway_factory(db_service, jwt_secret)

    router = APIRouter(prefix="/api/flashcards")

    @router.get("/", response_model=list[ResponseFlashcardDeck])
    @jwt_required
    async def get_flashcard_decks(request: Request, response: Response):
        user = request.state.user
        return await db_service.get_flashcard_decks_by_user_id(user.id)

    @router.post("/", response_model=ResponseFlashcardDeck)
    @jwt_required
    async def create_flashcard_deck(request: Request, response: Response):
        user = request.state.user
        data = await request.json()
        flashcard = await db_service.add_flashcard_deck_to_user(data, user.id)
        return flashcard

    @router.put("/{flashcard_id}", response_model=ResponseFlashcardDeck)
    @jwt_required
    async def update_flashcard_deck(request: Request, response: Response):
        flashcard_id = int(request.path_params['flashcard_id'])
        user = request.state.user
        data = await request.json()
        flashcard = await db_service.update_flashcard_deck_by_id(flashcard_id, data, user.id)
        return flashcard

    @router.delete("/{flashcard_id}")
    @jwt_required
    async def delete_flashcard_deck(request: Request, response: Response):
        flashcard_id = int(request.path_params['flashcard_id'])
        user = request.state.user
        await db_service.delete_flashcard_deck_by_id(flashcard_id, user.id)
        return Response(status_code=204)

    return router
