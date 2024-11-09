from sqlalchemy import Column, Integer, String, ForeignKey, DateTime,Time
from sqlalchemy.orm import relationship
from sqlalchemy.sql import text

from lead_server.models.quiz_models.question import Question
from lead_server.models.base import Base


class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    questions = relationship("Question", uselist=True,
                             cascade="all, delete-orphan")
    created_at = Column(DateTime, nullable=False, server_default=text('NOW()'))
    valid_until = Column(DateTime, nullable=False, server_default=text('NOW()'))
    time_to_complete = Column(Time, nullable=False)

    def __repr__(self):
        return f'Quiz<id={self.id}, title={self.title}, owner_id={self.owner_id}, created_at={self.created_at}, valid_until={self.valid_until}, time_to_complete={self.time_to_complete}>'

    @classmethod
    def from_dict(cls, data):
        self = cls()
        for field in ['title', 'owner_id', 'valid_until', 'time_to_complete']:
            if field in data:
                setattr(self, field, data[field])
        if 'questions' in data:
            self.questions = [Question().from_dict(q) for q in data['questions']]
        return self