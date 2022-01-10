from enum import Enum
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, Numeric
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class TopicType(Enum):
    boolean = 0
    integer_number = 1
    short_text = 2
    long_text = 3
    dynamic_checklist = 4
    time_delta = 5
    mood = 6


METADATA_LENGTH = 30
SHORT_TEXT_LENGTH = 512


class Topic(db.Model):
    __tablename__ = 'topic'
    id = Column(Integer, primary_key=True)
    user = Column(String(METADATA_LENGTH), unique=True, nullable=False)
    topictype = Column(Integer())
    topicname = Column(String(METADATA_LENGTH))
    active = Column(Boolean())
    order = Column(Integer())

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class RecordTypeShortText(db.Model):
    __tablename__ = 'record_type_short_text'
    id = Column(Integer, primary_key=True)
    topic = Column(Integer())
    date = Column(Date())
    value = Column(String())
    active = Column(Boolean())

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class RecordTypeBoolean(db.Model):
    __tablename__ = 'record_type_boolean'
    id = Column(Integer, primary_key=True)
    topic = Column(Integer())
    date = Column(Date())
    value = Column(Boolean())
    active = Column(Boolean())

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class RecordTypeLongText(db.Model):
    __tablename__ = 'record_type_long_text'
    id = Column(Integer, primary_key=True)
    topic = Column(Integer())
    date = Column(Date())
    value = Column(String())
    active = Column(Boolean())

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class RecordTypeTimeDelta(db.Model):
    __tablename__ = 'record_type_time_delta'
    id = Column(Integer, primary_key=True)
    topic = Column(Integer())
    date = Column(Date())
    valuefrom = Column(DateTime())
    valueto = Column(DateTime())
    active = Column(Boolean())

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class RecordTypeInteger(db.Model):
    __tablename__ = 'record_type_integer'
    id = Column(Integer, primary_key=True)
    topic = Column(Integer())
    date = Column(Date())
    value = Column(Numeric())
    active = Column(Boolean())

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}