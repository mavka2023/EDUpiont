from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from lead_server.models.base import Base


class Answer(Base):
    __tablename__ = 'answers'

    id = Column(Integer, primary_key=True)
    text = Column(String)
    is_correct = Column(Boolean)
    answer_type = Column(String)
    required_answer = Column(String)
    question_id = Column(Integer, ForeignKey('questions.id'))

    def __repr__(self):
        return f'Answer(id={self.id}, text={self.text}, is_correct={self.is_correct})'

    @classmethod
    def from_dict(cls,data):
        self = cls()
        for field in ['text', 'is_correct', 'answer_type', 'required_answer']:
            if field in data:
                setattr(self, field, data[field])
        return self
