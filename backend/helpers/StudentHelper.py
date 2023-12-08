# Import necessary modules and Student class
from backend.classes.Student import Student
import uuid
import datetime
import pytz

# Create an instance of the Student class
student = Student()

# Function to post a new student profile to the database
def post(first_name, last_name, email, _id):
    # Create a profile dictionary with student information
    profile = {
        "firstName": first_name,
        'lastName': last_name,
        '_id': _id,
        "email": email,
        "created": datetime.datetime.now(),  # Set the creation timestamp
    }

    # Insert the student profile into the database
    student.insert(profile)

# Function to get a student profile by ID
def get(_id):
    return student.get(_id)
