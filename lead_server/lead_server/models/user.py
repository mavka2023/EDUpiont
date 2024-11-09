from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import text

from lead_server.models.base import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    username = Column(String, nullable=False)
    cre_date = Column(DateTime, nullable=False, server_default=text('NOW()'))
    quizzes = relationship('Quiz',uselist=True)
    notes = relationship('Note', back_populates='owner', uselist=True, cascade='all, delete-orphan')
    flashcards = relationship('Flashcard', back_populates='owner', uselist=True, cascade='all, delete-orphan')
    attempts = relationship('Attempt', back_populates='user', uselist=True,
                            cascade='all, delete-orphan')

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', username='{self.username}')>"

    @classmethod
    def from_dict(cls, email, password_hash, username, **kwargs):
        return cls(email=email, password_hash=password_hash, username=username)

    @staticmethod
    def hash_password(password):
        return password #TODO: Implement password hashing