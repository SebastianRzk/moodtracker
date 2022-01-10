import json
import logging

from flask import Flask, g, request
from flask_oidc import OpenIDConnect
from topic_api import topic_api, edit_topic_api
from record_api import record_api
from models import db
from config import get_server_url, \
    get_oidc_testing, \
    get_oidc_debug, \
    get_oidc_realm, \
    get_oidc_secret, \
    get_oidc_valid_issuer, \
    get_oidc_debug_endpoints_enabled,\
    get_oidc_verified_email,\
    get_oidc_cookie_secure,\
    get_database_url

from flask import redirect


logging.basicConfig(level=logging.DEBUG)

oidc = OpenIDConnect()

app = Flask(__name__)

def init_app():
    app.config['SERVER_NAME'] = get_server_url()
    app.config.update({
        'SECRET_KEY': get_oidc_secret(),
        'TESTING': get_oidc_testing(),
        'DEBUG': get_oidc_debug(),
        'OIDC_VALID_ISSUERS': [get_oidc_valid_issuer()],
        'OIDC_CLIENT_SECRETS': 'client_secrets.json',
        'OIDC_ID_TOKEN_COOKIE_SECURE': get_oidc_cookie_secure(),
        'OIDC_REQUIRE_VERIFIED_EMAIL': get_oidc_verified_email(),
        'OIDC_OPENID_REALM': get_oidc_realm()
    })
    oidc.init_app(app)
    app.config[
        'SQLALCHEMY_DATABASE_URI'] = get_database_url()
#        'SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://moodtracker-user:moodtracker-pw@172.20.0.2:3306/moodtracker-db'
    db.init_app(app)


def get_user():
    return oidc.user_getinfo(['sub']).get('sub')


if get_oidc_debug_endpoints_enabled():
    @app.route('/')
    def hello_world():
        if oidc.user_loggedin:
            return ('Hello, %s, <a href="/private">See private</a> '
                    '<a href="/logout">Log out</a>') % \
                oidc.user_getfield('email')
        else:
            return 'Welcome anonymous, <a href="/private">Log in</a>'


    @app.route('/private')
    @oidc.require_login
    def hello_me():
        info = oidc.user_getinfo(['email', 'openid_id', 'sub', 'name'])
        print(oidc)
        return ('Hello, %s (%s)! %s %s <a href="/">Return</a>' %
                (info.get('email'), info.get('openid_id'), info.get('sub'), info.get('name')))@app.route('/api')

    @oidc.accept_token(True, ['openid'])
    def hello_api():
        return json.dumps({'hello': 'Welcome %s' % g.oidc_token_info['sub']})



@app.route('/api/topics', methods=['GET', 'PUT'])
@oidc.require_login
def topics():
    userid = get_user()
    return topic_api(request=request, db=db, userid=userid)


@app.route('/api/topics/<topic_id>', methods=['PUT', 'DELETE'])
@oidc.require_login
def edit_topics(topic_id):
    userid = get_user()
    return edit_topic_api(request=request, db=db, userid=userid, topic_id=topic_id)


@app.route('/logout')
@app.route('/api/logout')
def logout():
    oidc.logout()
    return 'Hi, you have been logged out! <a href="/">Return</a>'


@app.route('/api/topics/<topic_id>/records/<record_date>', methods=['GET', 'PUT'])
@oidc.require_login
def records(topic_id, record_date):
    userid = get_user()
    return record_api(request=request, db=db, user=userid, date_str=record_date, topic_id_str=topic_id)


@app.route('/api/user')
def user_status():
    if 'text/html'.capitalize() in request.headers['Accept'].capitalize():
        return redirect('/', 302)

    if oidc.user_loggedin:
        return {
            'loggedin': True,
            'username': get_user(),
            'loginroute': ''
        }
    oidc_redirect = oidc.require_login(lambda x: {})
    return {
        'loggedin': False,
        'loginroute': oidc_redirect().headers["Location"],
        'username': None
    }

init_app()

if __name__ == '__main__':
    app.run()
