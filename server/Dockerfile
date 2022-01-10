FROM alpine
RUN apk add python3 py3-pip gcc python3-dev musl-dev alpine-sdk && pip3 install flask Flask-OIDC alembic pymysql Flask-SQLAlchemy waitress && apk del gcc python3-dev musl-dev alpine-sdk
RUN mkdir /app
COPY . /app/
RUN rm -rfv /app/venv
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT /app/entrypoint.sh
