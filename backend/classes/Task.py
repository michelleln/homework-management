import datetime

from databases import DB
from flask import jsonify, abort


class Task(object):
    # profile is a dictionary containing details of the task to be added to database
    def insert(self, profile):
        DB.insert(collection="Tasks", data=profile)
        return profile

    def get(self, id):
        # find task by id in the "Task" collection, if not found return 404 otherwise return python object in json format
        task = DB.find_one("Tasks", {"_id": id})
        if task:
            return jsonify(task)
        abort(404)

    def delete(self, id):
        # if the task requested for deletion is found then reemove it from database
        task = DB.find_one("Tasks", {"_id": id})
        if task:
            DB.remove("Tasks", {"_id": id})
            return jsonify("Task removed")

        return jsonify("Task cannot be found at given id")

    def update(self, id, profile):
        # output profile. for debugging purpose. profile here is a dictionary with all possible fields in task.
        print(profile)
        task = DB.find_one("Tasks", {"_id": id})
        # check if specific fields are present in profile by looping thru fieldnames, if yes then update otherwise do nothing
        if task:
            # if the task is reeturned with grades and progress then update those, otherwise update the other details only
            if 'grade' and 'progress' in profile:
                DB.update("Tasks", {"_id": id}, {"$set": {"title": profile['title'], "deadline": profile['deadline'], "course_d": profile['course_id'], "description": profile['description'], "attachments": profile['attachments'],
                                                          "grade": profile['grade'], "progress": profile['progress']}})
            else:
                DB.update("Tasks", {"_id": id}, {"$set": {"title": profile['title'], "deadline": profile['deadline'],
                          "course_d": profile['course_id'], "description": profile['description'], "attachments": profile['attachments']}})

            return jsonify("Task updated")
        return jsonify("Task cannot be found at given id")

    def find_by_student(self, student_id):
        # find all tasks of a student given that student id
        result = []
        # get all tasks order by descending time
        tasks = DB.find("Tasks", {"student": student_id}).sort("created", -1)
        for task in tasks:
            result.append(task)
        return jsonify(result)

    def find_by_student_and_course(self, student_id, course_id):
        # self-explanatory: find task in a specific course for a student
        result = []
        tasks = DB.find(
            "Tasks", {"student": student_id, "course_id": course_id})
        for task in tasks:
            result.append(task)
        return jsonify(result)
