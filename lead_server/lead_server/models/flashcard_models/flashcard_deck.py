from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .flashcard import Flashcard
from lead_server.models.base import Base


class FlashcardDeck(Base):
    __tablename__ = 'flashcard_decks'

    id = Column(Integer, primary_key=True)
    title = Column(String(255))
    owner_id = Column(Integer, ForeignKey('users.id'))
    flashcards = relationship('Flashcard')

    @classmethod
    def from_dict(cls, data):
        self = cls()
        for field in ['title', 'owner_id']:
            if field in data:
                setattr(self, field, data[field])
        if 'flashcards' in data:
            self.flashcards = [Flashcard().from_dict(flashcard) for flashcard in data['flashcards']]
        return self