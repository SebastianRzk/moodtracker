from models.topic import save_topic, load_topics, validate_topic, load_topic_from_user, edit_topic, delete_topic
from request_util import load_and_trim, load_if_set
from models import METADATA_LENGTH
from flask import Response
from models.record import get_controller_for_type


def topic_api(request, db, userid):
    if request.method == 'GET':
        return load_topics(userid)
    elif request.method == 'PUT':
        request_value = request.get_json()
        topic_name = load_and_trim(values=request_value, trim_length=METADATA_LENGTH, property_name='topicname')
        topic_type = validate_topic(request_value['topictype'])
        order = int(request_value['order'])
        return save_topic(db=db, userid=userid, topic_name=topic_name, topic_type=topic_type, order=order)
    return {}


def edit_topic_api(request, db, userid, topic_id):
    topic_from_user = load_topic_from_user(userid=userid, topic_id=topic_id)
    if not topic_from_user:
        return Response('The topic does not belong to you!', 403)
    if request.method == 'PUT':
        request_value = request.get_json()
        topic_name = load_and_trim(values=request_value, trim_length=METADATA_LENGTH, property_name='topicname')
        order = int(load_if_set(values=request_value, property_name='order', default_value='0'))
        active_str = 'true'
        if 'active' in request_value and not request_value['active'] == '':
            active_str = request_value['active']
        active = bool(active_str)
        edit_topic(db=db, existing_topic=topic_from_user, topic_name=topic_name, order=order, active=active)
        return {'result': 'Topic edited'}
    if request.method == 'DELETE':
        get_controller_for_type(topic_from_user.topictype).delete_all_records(db=db, topic_id=topic_from_user.id)
        delete_topic(db, topic_from_user)
        return {'result': 'Topic and all records deleted.'}



