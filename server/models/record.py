from models import RecordTypeShortText, RecordTypeBoolean, RecordTypeLongText, RecordTypeTimeDelta, RecordTypeInteger
from models import SHORT_TEXT_LENGTH
from models import TopicType


def create_record_dto(
        from_="00:00",
        to_="00:00",
        number=0,
        text="",
        boolean=False
        ):
    return {
        'from': from_,
        'to': to_,
        'number': number,
        'text': text,
        'boolean': boolean
    }


class ShortTextController:

    def existing_id(self, date, topic_id):
        return RecordTypeShortText.query.filter_by(date=date, topic=topic_id).first()

    def load(self, date, topic_id):
        record = RecordTypeShortText.query.filter_by(date=date, topic=topic_id).first()
        if not record:
            return create_record_dto()
        return create_record_dto(text=record.as_dict()['value'])

    def store(self, db, date, topic_id, record):
        value = record['text']

        if len(record) > SHORT_TEXT_LENGTH:
            value = value[:SHORT_TEXT_LENGTH]

        new_record = RecordTypeShortText(date=date, topic=topic_id, value=value)
        db.session.add(new_record)
        db.session.commit()
        return True

    def update(self, db, existing_record, record):
        value = record['text']
        if len(record) > SHORT_TEXT_LENGTH:
            value = value[:SHORT_TEXT_LENGTH]
        existing_record.value = value
        db.session.commit()
        return True

    def delete_all_records(self, db, topic_id):
        db.session.query(RecordTypeShortText).filter(RecordTypeShortText.topic == topic_id).delete()
        db.session.commit()


class LongTextController:

    def existing_id(self, date, topic_id):
        return RecordTypeLongText.query.filter_by(date=date, topic=topic_id).first()

    def load(self, date, topic_id):
        record = RecordTypeLongText.query.filter_by(date=date, topic=topic_id).first()
        if not record:
            return create_record_dto()
        return create_record_dto(text=record.as_dict()['value'])

    def store(self, db, date, topic_id, record):
        value = record['text']

        new_record = RecordTypeLongText(date=date, topic=topic_id, value=value)
        db.session.add(new_record)
        db.session.commit()
        return True

    def update(self, db, existing_record, record):
        value = record['text']
        existing_record.value = value
        db.session.commit()
        return True

    def delete_all_records(self, db, topic_id):
        db.session.query(RecordTypeLongText).filter(RecordTypeLongText.topic == topic_id).delete()
        db.session.commit()


class BooleanController:

    def existing_id(self, date, topic_id):
        return RecordTypeBoolean.query.filter_by(date=date, topic=topic_id).first()

    def load(self, date, topic_id):
        record = RecordTypeBoolean.query.filter_by(date=date, topic=topic_id).first()
        if not record:
            return create_record_dto()
        return create_record_dto(boolean=record.as_dict()['value'])

    def store(self, db, date, topic_id, record):
        value = record['boolean']

        new_record = RecordTypeBoolean(date=date, topic=topic_id, value=value)
        db.session.add(new_record)
        db.session.commit()
        return True

    def update(self, db, existing_record, record):
        existing_record.value = record['boolean']
        db.session.commit()
        return True

    def delete_all_records(self, db, topic_id):
        db.session.query(RecordTypeBoolean).filter(RecordTypeBoolean.topic == topic_id).delete()
        db.session.commit()


class TimeDeltaController:

    def existing_id(self, date, topic_id):
        return RecordTypeTimeDelta.query.filter_by(date=date, topic=topic_id).first()

    def load(self, date, topic_id):
        record = RecordTypeTimeDelta.query.filter_by(date=date, topic=topic_id).first()
        if not record:
            return create_record_dto()
        return create_record_dto(from_=self.to_time_str(record.valuefrom), to_=self.to_time_str(record.valueto))

    def store(self, db, date, topic_id, record):
        new_record = RecordTypeTimeDelta(date=date, topic=topic_id, valuefrom=record['from'], valueto=record['to'])
        db.session.add(new_record)
        db.session.commit()
        return True

    def update(self, db, existing_record, record):
        existing_record.valuefrom = record['from']
        existing_record.valueto = record['to']
        db.session.commit()
        return True

    def to_time_str(self, time):
        return "{}:{}".format(time.hour, time.minute)

    def delete_all_records(self, db, topic_id):
        db.session.query(RecordTypeTimeDelta).filter(RecordTypeTimeDelta.topic == topic_id).delete()
        db.session.commit()


class IntegerController:

    def existing_id(self, date, topic_id):
        return RecordTypeInteger.query.filter_by(date=date, topic=topic_id).first()

    def load(self, date, topic_id):
        record = RecordTypeInteger.query.filter_by(date=date, topic=topic_id).first()
        if not record:
            return create_record_dto()
        return create_record_dto(number=record.value)

    def store(self, db, date, topic_id, record):
        new_record = RecordTypeInteger(date=date, topic=topic_id, value=record['number'])
        db.session.add(new_record)
        db.session.commit()
        return True

    def update(self, db, existing_record, record):
        value = record['number']
        existing_record.value = value
        db.session.commit()
        return True

    def delete_all_records(self, db, topic_id):
        db.session().query(RecordTypeInteger).filter(RecordTypeInteger.topic == topic_id).delete()
        db.session().commit()


def get_controller_for_type(topic_type):
    if topic_type == TopicType.boolean.value:
        return BooleanController()
    if topic_type == TopicType.integer_number.value:
        return IntegerController()
    if topic_type == TopicType.short_text.value:
        return ShortTextController()
    if topic_type == TopicType.long_text.value:
        return LongTextController()
    if topic_type == TopicType.time_delta.value:
        return TimeDeltaController()
    if topic_type == TopicType.mood.value:
        return IntegerController()
    if topic_type == TopicType.dynamic_checklist.value:
        return LongTextController()
    raise Exception("Topic type {} not found".format(topic_type))

