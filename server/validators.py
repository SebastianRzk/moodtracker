from config import get_max_date_delta
from datetime import date


def validate_date(input_date):
    delta = date.today() - input_date
    if delta.days > get_max_date_delta():
        raise Exception('The date is out of range')
    return input_date
