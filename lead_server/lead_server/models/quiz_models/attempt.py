from lead_server.models.base import Base
from sqlalchemy import Column, JSON, Integer, ForeignKey,DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import text


class Attempt(Base):

    __tablename__ = 'attempt'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))  # User who made the attempt
    attempt = Column(JSON)  # The attempt made by the user in JSON format (e.g. [{"question_id": 1, "answers": []}])
    user = relationship('User', back_populates='attempts')
    start_date = Column(DateTime,server_default=text('NOW()'))  # The date when the attempt was started

    def __repr__(self):
        return f'Atempt(id={self.id}, user_id={self.user_id}, attempt={self.attempt})'
