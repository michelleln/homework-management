from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

# Initialize SQLAlchemy for database operations
db = SQLAlchemy()

# Function to generate a UUID (hexadecimal format)
def get_uuid():
    return uuid4().hex

# User class representing the 'users' table in the database
class User(db.Model):
    # Specify the table name
    __tablename__ = "users"

    # Define columns for the 'users' table
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
