from fastapi import FastAPI, Response

from lead_server.routes.auth_router import get_auth_router
from lead_server.routes.flashcard_router import get_flashcard_router
from lead_server.routes.quiz_router import get_quiz_router
from lead_server.routes.user_router import get_user_router
from lead_server.routes.note_router import get_note_router
from lead_server.services.database_service import DatabaseService


async def init_app(connection_string):
    app = FastAPI()
    db_service = await DatabaseService.create(connection_string)

    @app.get('/_healthcheck')
    async def healthcheck():
        return Response(content="OK", status_code=200)

    app.include_router(get_user_router(db_service,'secret'))
    app.include_router(get_auth_router(db_service,
                                       'secret'))  ## TODO: Change secret to a more secure value also move it to a config file
    app.include_router(get_note_router(db_service, 'secret'))
    app.include_router(get_quiz_router(db_service, 'secret'))
    app.include_router(get_flashcard_router(db_service, 'secret'))

    return app
