#!/bin/sh
set -e
cd /app/
cd database
alembic upgrade head
cd ..

python3 waitress-server.py
