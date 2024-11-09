import asyncio


import uvicorn

from lead_server.routes.main import init_app
from lead_server.services.database_service import DatabaseService
from lead_server.models.user import User


async def setup_server(conn_string):
    app = await init_app(conn_string)
    return app


if __name__ == '__main__':
    conn_string = 'postgresql+psycopg://postgres:postgres@database:5432/postgres'
    app = asyncio.run(setup_server(conn_string))
    uvicorn.run(app, host='0.0.0.0', port=8080)
