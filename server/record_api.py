from models.topic import load_topic_from_user
from models.record import get_controller_for_type
from converter import to_id, to_date, to_bool, to_time
from validators import validate_date
from flask import Response
from request_util import load_if_set


def record_api(request, user, db, date_str, topic_id_str):
    topic_id = to_id(topic_id_str)
    date = to_date(date_str)
    validate_date(date)
    topic_from_user = load_topic_from_user(userid=user, topic_id=topic_id)
    if not topic_from_user:
        return Response('The topic does not belong to you!', 403)

    if request.method == 'GET':
        return get_controller_for_type(topic_from_user.topictype).load(date, topic_from_user.id)

    elif request.method == 'PUT':
        request_value = request.get_json()

        boolean_str = 'true'
        if 'boolean' in request_value and not request_value['boolean'] == '':
            boolean_str = request_value['boolean']

        record = {
            'from': to_time(load_if_set(values=request_value, property_name='from', default_value="00:00")),
            'to': to_time(load_if_set(values=request_value, property_name='to', default_value="00:00")),
            'number': load_if_set(values=request_value, property_name='number', default_value=0),
            'text': load_if_set(values=request_value, property_name='text', default_value=""),
            'boolean': to_bool(boolean_str)
        }

        controller = get_controller_for_type(topic_from_user.topictype)
        existing = controller.existing_id(date, topic_id)

        if existing:
            result = controller.update(db, existing, record)
        else:
            result = controller.store(db, date, topic_id, record)

        if result:
            return {'result': 'record updated'}
        return {'result': 'update failed'}









