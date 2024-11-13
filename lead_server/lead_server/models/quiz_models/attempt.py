from lead_server.models.base import Base
from sqlalchemy import Column, JSON, Integer, ForeignKey,DateTime,Boolean,Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import text


class Attempt(Base):

    __tablename__ = 'attempts'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))  # User who made the attempt
    quiz_id = Column(Integer, ForeignKey('quizzes.id'))  # Quiz attempted
    attempt = Column(JSON)  # The attempt made by the user in JSON format (e.g. [{"question_id": 1, "answers": []}])
    is_completed = Column(Boolean, default=0)  # Whether the attempt is completed or not
    user = relationship('User', back_populates='attempts')
    score = Column(Float)
    start_date = Column(DateTime,server_default=text('NOW()'))  # The date when the attempt was started

    def __repr__(self):
        return f'Atempt(id={self.id}, user_id={self.user_id}, attempt={self.attempt})'

    @classmethod
    def new_attempt(cls, user_id, quiz_id):
        obj = cls()
        obj.user_id = user_id
        obj.quiz_id = quiz_id
        obj.is_completed = False
        return obj