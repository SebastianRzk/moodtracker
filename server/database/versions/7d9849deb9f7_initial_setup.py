"""initial_setup

Revision ID: 7d9849deb9f7
Revises: 
Create Date: 2021-12-10 17:53:59.458655

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.mysql import LONGTEXT


# revision identifiers, used by Alembic.
revision = '7d9849deb9f7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'topic',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('user', sa.String(30)),
        sa.Column('topictype', sa.Integer()),
        sa.Column('topicname', sa.String(30)),
        sa.Column('order', sa.Integer()),
        sa.Column('active', sa.Boolean())
    )
    op.create_table(
        'record_type_boolean',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('date', sa.Date()),
        sa.Column('topic', sa.Integer()),
        sa.Column('value', sa.Boolean()),
        sa.Column('active', sa.Boolean())
    )
    op.create_table(
        'record_type_short_text',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('date', sa.Date()),
        sa.Column('topic', sa.Integer()),
        sa.Column('value', sa.String(512)),
        sa.Column('active', sa.Boolean())
    )
    op.create_table(
        'record_type_long_text',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('date', sa.Date()),
        sa.Column('topic', sa.Integer()),
        sa.Column('value', LONGTEXT),
        sa.Column('active', sa.Boolean())
    )
    op.create_table(
        'record_type_time_delta',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('date', sa.Date()),
        sa.Column('topic', sa.Integer()),
        sa.Column('valuefrom', sa.DateTime()),
        sa.Column('valueto', sa.DateTime()),
        sa.Column('active', sa.Boolean())
    )
    op.create_table(
        'record_type_integer',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('date', sa.Date()),
        sa.Column('topic', sa.Integer()),
        sa.Column('value', sa.Integer()),
        sa.Column('active', sa.Boolean())
    )


def downgrade():
    op.drop_table('topic')
    op.drop_table('record_type_boolean')
    op.drop_table('record_type_short_text')
    op.drop_table('record_type_long_text')
    op.drop_table('record_type_time_delta')
    op.drop_table('record_type_integer')
    op.drop_table('topic')
