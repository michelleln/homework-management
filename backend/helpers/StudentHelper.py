from backend.classes.Student import Student
import uuid
import datetime
import pytz

student = Student()


def post(first_name, last_name, image, email, _id, courses):
    profile = {"first_name": first_name, 'last_name': last_name, '_id': _id, "image": image,
               "email": email, "courses": courses, "created": datetime.datetime.now()}
    profile["last_sync_date"] = profile["created"]
    student.insert(profile)


def get(_id):
    return student.get(_id)
