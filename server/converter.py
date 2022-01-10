from datetime import time, date
from datetime import datetime


def to_id(id_str):
    return int(id_str)


def to_date(date_str):
    return date.fromisoformat(str(date_str))


def to_bool(bool_str):
    return bool(bool_str)


def to_time(time_str):
    parsed_time = time.fromisoformat(time_str)
    return datetime(year=2020, month=1, day=1, hour=parsed_time.hour, minute=parsed_time.minute)
