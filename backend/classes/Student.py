from backend.databases import DB
from flask import jsonify

class Student:
    def insert(self, profile):
        # Insert a new student profile into the database
        # The 'profile' parameter is a dictionary containing details of the student
        DB.insert(collection="students", data=profile)

    def get(self, id):
        # Retrieve a student profile from the database by ID
        # The 'id' parameter is the unique identifier of the student
        students = DB.find("students", {"_id": id})
        result = []

        # Check if any students were found with the given ID
        if students:
            for student in students:
                result.append(student)
                return jsonify(result[0])

        # Return an error message if the student is not found
        return jsonify({"error": "Student not found"}), 404
