from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from lead_server.models.quiz_models.answer import Answer
from lead_server.models.base import Base


class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True)
    question = Column(String)
    quiz_id = Column(Integer, ForeignKey('quizzes.id'))
    resource_url = Column(String)
    question_type = Column(String)
    answers = relationship('Answer',
                           primaryjoin='Question.id == Answer.question_id',
                           uselist=True,
                           cascade='all, delete-orphan')
    score = Column(Integer)

    def __repr__(self):
        return f'<Question(id={self.id}, question={self.question})>'


    @classmethod
    def from_dict(cls, data):
        self = cls()
        for field in ['question', 'quiz_id', 'resource_url', 'score', 'question_type']:
            if field in data:
                setattr(self, field, data[field])
        if 'answers' in data:
            self.answers = [Answer.from_dict(answer) for answer in data['answers']]
        return self
