from lead_server.models.base import Base
from lead_server.models.note_models.note import Note
from lead_server.models.user import User
from lead_server.models.quiz_models.quiz import Quiz
from lead_server.models.quiz_models.question import Question
from lead_server.models.quiz_models.answer import Answer
from lead_server.models.quiz_models.attempt import Attempt
from lead_server.models.flashcard_models.flashcard_deck import FlashcardDeck
from lead_server.models.flashcard_models.flashcard import Flashcard
from lead_server.models.calendar_models.calendar_event import CalendarEvent


def initialize_orm(engine):
    Base.metadata.create_all(engine)

