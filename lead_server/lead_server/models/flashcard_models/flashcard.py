from sqlalchemy import Column, Integer, String, ForeignKey


from lead_server.models.base import Base


class Flashcard(Base):
    __tablename__ = 'flashcards'

    id = Column(Integer, primary_key=True)
    text_front = Column(String, nullable=False)  # Flashcard text in Markdown format
    text_back = Column(String, nullable=False)
    deck_id = Column(Integer, ForeignKey('flashcard_decks.id'))

    @classmethod
    def from_dict(cls, data):
        self = cls()
        for field in ['text_front', 'text_back', 'deck_id']:
            if field in data:
                setattr(self, field, data[field])
        return self
