from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from lead_server.models.base import Base


class Flashcard(Base):
    __tablename__ = 'flashcards'

    id = Column(Integer, primary_key=True)
    text = Column(String, nullable=False) # Flashcard text in Markdown format
    title = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship("User", back_populates="notes",uselist=False)


    def from_dict(self, data):
        for field in ['text', 'title', 'owner_id']:
            if field in data:
                setattr(self, field, data[field])