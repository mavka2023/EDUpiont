from datetime import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

from lead_server.models.base import Base


class CalendarEvent(Base):
    __tablename__ = 'calendar_events'

    id = Column(Integer, primary_key=True)
    text = Column(String, nullable=False)  # Event header text
    description = Column(String)
    remind_datetime = Column(DateTime, nullable=False)
    owner_id = Column(Integer, ForeignKey('users.id'))

    @classmethod
    def from_dict(cls, data):
        self = cls()
        for field in ['text', 'remind_datetime', 'owner_id','description']:
            if field in data:
                if field == 'remind_datetime':
                    setattr(self, field, datetime.fromisoformat(data[field]))
                setattr(self, field, data[field])
        return self
