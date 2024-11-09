from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession, AsyncEngine
from sqlalchemy.orm import selectinload, lazyload, joinedload
from typing import List
from lead_server.models import User, Quiz, Note
from sqlalchemy.future import select


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
                select(Quiz).where(Quiz.id == quiz_id).where(Quiz.owner_id == user_id))).scalars().first()

    async def get_quizzes(self, user_id: int) -> List[Quiz]:
        async with self.session_maker() as session:
            return (await session.execute(
                select(Quiz).where(Quiz.owner_id == user_id))).scalars().all()

    async def create_quiz(self, quiz: Quiz, user_id: int) -> Quiz:
        async with self.session_maker() as session:
            quiz.owner_id = user_id
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
            note = Note(**note)
            user = await self.get_user_by_id(user_id)
            user.notes.append(note)
            session.add(user)
            await session.commit()
            return note

    async def update_note_by_id(self, note_id: int, note_update: dict):
        async with self.session_maker() as session:
            note = (await session.get(Note, note_id))
            for key, value in note_update.items():
                setattr(note, key, value)
            session.add(note)
            await session.commit()
            return note

    async def close(self):
        await self.engine.dispose()
        await self.session_maker.close()
