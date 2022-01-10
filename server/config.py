import os


def _get_or_default(name, default_value):
    value = os.environ.get(name)
    if not value:
        return default_value
    return value

def str_to_bool(str):
    str_cap = str.capitalize()

    if str_cap == "TRUE" or str_cap == "YES":
        return True
    return False

def get_max_date_delta():
    return _get_or_default('MOODTRACKER_MAX_DATE_DELTA', 120)


def get_server_url():
    return _get_or_default('MOODTRACKER_SERVER_URL', 'dev.local')


def get_oidc_testing():
    return str_to_bool(_get_or_default('MOODTRACKER_OIDC_TESTING', 'False'))


def get_oidc_debug():
    return str_to_bool(_get_or_default('MOODTRACKER_OIDC_DEBUG', 'False'))


def get_oidc_cookie_secure():
    return str_to_bool(_get_or_default('MOODTRACKER_OIDC_COOKIE_SECURE', 'False'))


def get_oidc_verified_email():
    return str_to_bool(_get_or_default('MOODTRACKER_OIDC_VERIFIED_EMAIL', 'False'))


def get_oidc_realm():
    return _get_or_default('MOODTRACKER_OIDC_REALM', 'your.realm')


def get_oidc_secret():
    return _get_or_default('MOODTRACKER_OIDC_SECRET', 'krdfuhgldiswaugbapiugbpuiob')


def get_oidc_valid_issuer():
    return _get_or_default('MOODTRACKER_OIDC_VALID_ISSUER', 'https://insert.auth.server.here/application/o/your.realm/')


def get_oidc_debug_endpoints_enabled():
    return bool(_get_or_default('MOODTRACKER_OIDC_DEBUG_ENDOINTS_ENABLED', 'False'))


def get_database_url():
    return _get_or_default('MOODTRACKER_DB_URL', 'mysql+pymysql://moodtracker-user:moodtracker-pw@moodtracker-db:3306/moodtracker-db')
