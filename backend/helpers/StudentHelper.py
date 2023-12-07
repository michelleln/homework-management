from backend.classes.Student import Student
import uuid
import datetime
import pytz

student = Student()

def post(first_name, last_name, email, _id):
    profile = {"firstName": first_name, 'lastName': last_name, '_id': _id, "email": email, "created": datetime.datetime.now()}
    #profile["last_sync_date"] = profile["created"]
    student.insert(profile)


def get(_id):
    return student.get(_id)
