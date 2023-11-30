import datetime

from databases import DB
from flask import jsonify, abort


class Student(object):
    def insert(self, profile):
        # profile is a dictionary containing details of the student to be added to database
        DB.insert(collection="Students", data=profile)

    def get(self, _id):
        student = DB.find_one("Students", {"_id": _id})
        if student:
            return jsonify(student)
        abort(404)
