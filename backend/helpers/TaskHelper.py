# Import necessary modules and classes
from backend.classes.Task import Task
from flask import jsonify
import uuid
import datetime
from bson import BSON

# Create an instance of the Task class
task = Task()

# Function to create a datetime object from date and time strings
def create_date(date, time):
    print(f"Input Date: {date}, Input Time: {time}")
    date_obj = datetime.datetime.strptime(f"{date}T{time}", '%Y-%m-%dT%H:%M')
    return date_obj

# Function to post a new task to the database
def post(title, deadline, course_id, description, student):
    # Generate a unique identifier using uuid module
    result = task.insert({
        "title": title,
        "deadline": deadline,
        "course_id": course_id,
        "description": description,
        "student": student,
        "_id": str(uuid.uuid4()),  # Convert UUID to string
        "created": datetime.datetime.now()
    })

    return result

# Function to get tasks by student ID
def get_by_student(id):
    return task.find_by_student(id)

# Function to get tasks by deadline month
def get_tasks_by_deadline_month(student, year, month):
    start_date = datetime.datetime(year, month, 1)
    end_date = datetime.datetime(year, month + 1, 1) if month < 12 else datetime.datetime(year + 1, 1, 1)
    return task.find_by_deadline_month(student, start_date, end_date)

# Function to get distinct courses for a student
def get_distinct_courses(student):
    return task.find_distinct_courses(student)
