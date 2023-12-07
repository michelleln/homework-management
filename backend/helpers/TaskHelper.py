from backend.classes.Task import Task
from flask import jsonify
import uuid
import datetime
from bson import BSON
task = Task()


def create_date(date, time):
    print(f"Input Date: {date}, Input Time: {time}")
    date_obj = datetime.datetime.strptime(f"{date}T{time}", '%Y-%m-%dT%H:%M')
    return date_obj

def post(title, deadline, course_id, description, student):
    # uuid module provides a means for generating universally unique identifiers
    result = task.insert({"title": title, "deadline": deadline, "course_id": course_id,
                          "description": description, "student": student, "_id": str(uuid.uuid4()),
                          "created": datetime.datetime.now()})

    return result

def get_by_student(id):
    return task.find_by_student(id)

def get_tasks_by_deadline_month(student, year, month):
    #time = "00:00"
    start_date = datetime.datetime(year, month, 1)
    end_date = datetime.datetime(year, month + 1, 1) if month < 12 else datetime.datetime(year + 1, 1, 1)
    return task.find_by_deadline_month(student, start_date, end_date)

def get_distinct_courses(student):
    return task.find_distinct_courses(student)