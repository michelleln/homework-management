import datetime
import pymongo 
from backend.databases import DB
from flask import jsonify, abort


class Task(object):
    # profile is a dictionary containing details of the task to be added to database
    def insert(self, profile):
        DB.insert(collection="tasks", data=profile)
        return profile

    def find_by_student(self, student_id):
        # find all tasks of a student given that student id
        result = []
        # get all tasks order by descending time
        tasks = DB.find("tasks", {"student": student_id}).sort("created", -1)
        for task in tasks:
            result.append(task)
        return jsonify(result)

    def find_by_student_and_course(self, student_id, course_id):
        # self-explanatory: find task in a specific course for a student
        result = []
        tasks = DB.find("tasks", {"student": student_id, "course_id": course_id})
        for task in tasks:
            result.append(task)
        return jsonify(result)

    def find_by_deadline_month(self, student, start_date, end_date):
        # Find all tasks of a student with a deadline in the specified month
        result = []
    
        # Query tasks with deadline within the specified month
        tasks = DB.find("tasks", {"student": student, "deadline": {"$gte": start_date, "$lt": end_date}})
        
        for task in tasks:
            result.append(task)

        return jsonify(result)
    
    def find_distinct_courses(self, student):
        result = []
        # get all tasks order by descending time
        tasks = DB.find_distinct("tasks", "course_id", {"student": student})
        for task in tasks:
            result.append(task)
        return jsonify(result)
