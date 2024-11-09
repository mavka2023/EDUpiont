import sqlalchemy

from models import initialize_orm
from sqlalchemy.orm import Session

conn_string = 'postgresql+psycopg://postgres:postgres@database:5432/postgres'
engine = sqlalchemy.create_engine(conn_string)
initialize_orm(engine)

print('Database initialized')
