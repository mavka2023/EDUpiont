from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession, AsyncEngine
from sqlalchemy.orm import selectinload, lazyload, joinedload
from typing import List
from lead_server.models import User, Quiz, Note, Flashcard, Question, Answer
from sqlalchemy.future import select

from lead_server.models.flashcard_models.flashcard_deck import FlashcardDeck


class DatabaseService:
    engine: AsyncEngine = None
    session_maker = None

    @classmethod
    async def create(cls, connection_string: str, pool_size: int = 32, max_overflow: int = 0,
                     pool_recycle: int = 3600) -> 'DatabaseService':
        obj = cls()
        obj.engine = create_async_engine(connection_string, pool_size=pool_size, max_overflow=max_overflow,
                                         pool_recycle=pool_recycle)
        obj.session_maker = async_sessionmaker(obj.engine, expire_on_commit=False)
        return obj

    async def add_user(self, user: User) -> None:
        session: AsyncSession = None
        async with self.session_maker() as session:
            session.add(user)
            await session.commit()

    async def get_user_by_email(self, user_email: str) -> User:
        session: AsyncSession = None
        async with self.session_maker() as session:
            return (await session.execute(select(User)
                                          .options(selectinload(User.notes))
                                          .options(selectinload(User.attempts))
                                          .options(selectinload(User.quizzes))
                                          .options(selectinload(User.flashcards))
                                          .where(User.email == user_email))).scalars().first()

    async def get_user_by_id(self, user_id: int) -> User:
        session: AsyncSession = None
        async with self.session_maker() as session:
            return (await session.execute(select(User).where(User.id == user_id))).scalars().first()

    async def get_full_user_by_id(self, user_id: int) -> User:
        session: AsyncSession = None
        async with self.session_maker() as session:
            user = (await session.execute(
                select(User)
                .options(joinedload(User.notes))
                .options(joinedload(User.attempts))
                .options(joinedload(User.quizzes))
                .options(joinedload(User.flashcards))
                .where(User.id == user_id))).scalars().first()
            return user

    async def get_quiz_by_id(self, quiz_id: int, user_id: int) -> Quiz:
        async with self.session_maker() as session:
            return (await session.execute(
                select(Quiz).where(Quiz.id == quiz_id)
                .options(selectinload(Quiz.questions).selectinload(Question.answers))
                .where(Quiz.owner_id == user_id))).scalars().first()

    async def get_full_quiz_by_id(self, quiz_id: int, user_id: int) -> Quiz:
        async with self.session_maker() as session:
            return (await session.execute(
                select(Quiz)
                .options(joinedload(Quiz.questions).options(joinedload(Question.answers)))
                .where(Quiz.id == quiz_id).where(Quiz.owner_id == user_id))).scalars().first()

    async def get_quizzes(self, user_id: int) -> List[Quiz]:
        async with self.session_maker() as session:
            return (await session.execute(
                select(Quiz).where(Quiz.owner_id == user_id))).scalars().all()

    async def create_quiz(self, quiz: dict, user_id: int) -> Quiz:
        async with self.session_maker() as session:
            quiz = Quiz.from_dict(quiz)
            quiz.owner_id = user_id
            session.add(quiz)
            await session.commit()
            return quiz

    async def update_quiz(self, quiz_id: int, quiz_data: dict, user_id: int) -> None:
        async with self.session_maker() as session:
            quiz = (await self.get_full_quiz_by_id(quiz_id, user_id))
            if quiz.owner_id != user_id:
                raise Exception("User does not own this quiz")
            for key, value in quiz_data.items():
                if key == "questions":
                    quiz.questions = []
                    for question in value:
                        new_question = Question.from_dict(question)
                        quiz.questions.append(new_question)
                else:
                    setattr(quiz, key, value)
            if quiz.id != quiz_id:
                raise Exception("User cannot update quiz with different id")
            session.add(quiz)
            await session.commit()
            return quiz

    async def update_user(self, user: User) -> None:
        async with self.session_maker() as session:
            session.add(user)
            await session.commit()

    async def get_notes_by_user_id(self, user_id: int):
        async with self.session_maker() as session:
            return (await session.execute(select(Note).where(Note.owner_id == user_id))).scalars().all()

    async def add_note_to_user(self, note: dict, user_id: int):
        async with self.session_maker() as session:
            note = Note.from_dict(note)
            user = (await session.execute(
                select(User).options(joinedload(User.notes)).where(User.id == user_id))).scalars().first()
            user.notes.append(note)
            session.add(user)
            await session.commit()
            return note

    async def update_note_by_id(self, note_id: int, note_update: dict, user_id: int):
        async with self.session_maker() as session:
            note = (await session.get(Note, note_id))
            if note.owner_id != user_id:
                raise Exception("User does not own this note")
            for key, value in note_update.items():
                setattr(note, key, value)
            if note.id != note_id:
                raise Exception("User cannot update note with different id")
            session.add(note)
            await session.commit()
            return note

    async def get_flashcard_decks_by_user_id(self, user_id: int):
        async with self.session_maker() as session:
            return (
                await session.execute(select(FlashcardDeck)
                                      .options(selectinload(FlashcardDeck.flashcards))
                                      .where(FlashcardDeck.owner_id == user_id))).scalars().all()

    async def get_full_flashcard_deck_by_id(self, deck_id: int, user_id: int):
        async with self.session_maker() as session:
            return (await session.execute(
                select(FlashcardDeck)
                .options(joinedload(FlashcardDeck.flashcards))
                .where(FlashcardDeck.id == deck_id).where(FlashcardDeck.owner_id == user_id))).scalars().first()

    async def add_flashcard_deck_to_user(self, deck: dict, user_id: int):
        async with self.session_maker() as session:
            flashcard_deck = FlashcardDeck.from_dict(deck)
            user = (await session.execute(
                select(User).options(joinedload(User.flashcards)).where(User.id == user_id))).scalars().first()
            user.flashcards.append(flashcard_deck)
            session.add(user)
            await session.commit()
            return flashcard_deck

    async def update_flashcard_deck_by_id(self, deck_id: int, deck_update: dict, user_id: int):
        async with self.session_maker() as session:
            deck = await self.get_full_flashcard_deck_by_id(deck_id, user_id)
            if deck.owner_id != user_id:
                raise Exception("User does not own this flashcard deck")
            for key, value in deck_update.items():
                if key == "flashcards":
                    deck.flashcards = []
                    for flashcard in value:
                        new_flashcard = Flashcard.from_dict(flashcard)
                        deck.flashcards.append(new_flashcard)
                else:
                    setattr(deck, key, value)
            if deck.id != deck_id:
                raise Exception("User cannot update flashcard deck with different id")
            session.add(deck)
            await session.commit()
            return deck

    async def delete_flashcard_deck_by_id(self, flashcard_id, id):
        async with self.session_maker() as session:
            flashcard = await self.get_full_flashcard_deck_by_id(flashcard_id, id)
            if flashcard.owner_id != id:
                raise Exception("User does not own this flashcard deck")
            await session.delete(flashcard)
            await session.commit()

    async def delete_note_by_id(self, note_id, id):
        async with self.session_maker() as session:
            note = await session.get(Note, note_id)
            if note.owner_id != id:
                raise Exception("User does not own this note")
            await session.delete(note)
            await session.commit()

    async def delete_quiz_by_id(self, quiz_id, id):
        async with self.session_maker() as session:
            quiz = await session.get(Quiz, quiz_id)
            if quiz.owner_id != id:
                raise Exception("User does not own this quiz")
            await session.delete(quiz)
            await session.commit()


async def close(self):
    await self.engine.dispose()
    await self.session_maker.close()
