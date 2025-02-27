from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from lead_server.models.base import Base


class Note(Base):
    __tablename__ = 'notes'

    id = Column(Integer, primary_key=True)
    text = Column(String, nullable=False) # Note text in Markdown format
    title = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey('users.id'))

    @classmethod
    def from_dict(cls, data):
        self = cls()
        for field in ['text', 'title', 'owner_id']:
            if field in data:
                setattr(self, field, data[field])
        return self