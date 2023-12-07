import datetime
from backend.databases import DB
from flask import jsonify


class Student:
    def insert(self, profile):
        # profile is a dictionary containing details of the student to be added to database
        DB.insert(collection="students", data=profile)

    def get(self, id):
        students = DB.find("students", {"_id": id})
        result = []
        if students:
            for student in students:
                result.append(student)
                return jsonify(result[0])
        return jsonify({"error": "Student not found"}), 404
