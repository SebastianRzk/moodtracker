from models import Topic, TopicType


def validate_topic(topic):
    topic_number = int(topic)
    if topic_number < 0 or topic_number > len(TopicType):
        raise Exception('Topic type with number {} not found', topic_number)
    return topic_number


def load_topics(userid):
    elements = Topic.query.filter_by(user=userid).order_by(Topic.order).all()
    result = []

    for element in elements:
        result.append(element.as_dict())

    return {'topics': result}


def save_topic(db, userid, topic_name, topic_type, order):
    new_topic = Topic(user=userid, topicname=topic_name, topictype=topic_type, order=order, active=True)
    print(new_topic.as_dict())
    db.session.add(new_topic)
    db.session.commit()
    return {'result': 'topic saved'}


def edit_topic(db, existing_topic,topic_name, order, active):
    existing_topic.topicname = topic_name
    existing_topic.order = order
    existing_topic.active = active
    db.session.commit()


def load_topic_from_user(userid, topic_id):
    topic = Topic.query.filter_by(user=userid, id=topic_id).first()
    print("request topic from user", topic_id, type(topic_id), userid, topic)
    if not topic:
        return None
    return topic


def delete_topic(db, existing_topic):
    db.session.delete(existing_topic)
    db.session.commit()
