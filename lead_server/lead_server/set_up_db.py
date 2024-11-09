import sqlalchemy

from models import initialize_orm
from sqlalchemy.orm import Session

conn_string = 'postgresql+psycopg://postgres:postgres@database:5432/postgres'
engine = sqlalchemy.create_engine(conn_string)
initialize_orm(engine)

print('Database initialized')

# from models import User
#
#
# with Session(engine) as session:
#     user = User(username='admin',email='admin@edupoint.pl',password_hash=User.hash_password('admin'))
#     session.add(user)
#     session.commit()

