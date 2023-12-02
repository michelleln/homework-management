import os
from flask import Flask
from flask import jsonify, abort, request, make_response, Blueprint
from backend.helpers import CourseHelper, StudentHelper, TaskHelper
from backend.databases import DB
from flask_cors import CORS
import datetime
import requests
import json

# Configure application
bp = Blueprint('main', __name__)


def create_app(config):
    app = Flask(__name__)
    CORS(app)
    DB.init()
    register_blueprints(app)
    return app


def register_blueprints(app):
    app.register_blueprint(bp)


@bp.route('/')
def index():
    return 'Hello World!'


@bp.route('/api/students', methods=['POST'])
def post_student():
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    image = data['image']
    _id = data['_id']
    courses = data['courses']
    StudentHelper.post(first_name, last_name, image, email, _id, courses)
    return jsonify("Sucessfully added test student")

# endpoint to get student detail by id


@bp.route('/api/student/<id>', methods=['GET'])
def get_student(id):
    return StudentHelper.get(id)

# endpoint to upadte student information by id


@bp.route('/api/student/<id>', methods=['PATCH'])
def update_student(id):
    student = DB.find_one("Students", {"_id": id})
    sync = request.args.get('sync')
    if student and sync and sync == 'true':
        last_sync_date = datetime.datetime.now()
        DB.update("Students", {"_id": id}, {
                  "$set": {"last_sync_date": last_sync_date}})
        return jsonify("Successfully upadted the student information")

    return jsonify("No student matching given id")

# upload files


@bp.route('/api/file/upload', methods=['POST'])
def post_file():
    files = request.files.getlist('file')
    return FileController.upload_files(files)

# get files by id


@bp.route('/api/file/retrieve', methods=['GET'])
def retrieve_file():
    file_id = request.args.get('id')
    try:
        file_result = FileController.get_file(file_id)
        response = make_response({"filedata": base64.b64encode(
            file_result.read()).decode("utf-8"), "filename": file_result.filename})
        return response
    except NoFile:
        abort(404)

# endpoint to create a task


@bp.route('/api/task', methods=['POST'])
def post_task():
    data = request.get_json(silent=True)
    title = data['title']
    date = data['date']  # should be in the form of "08 Nov 2019"
    time = data['time']  # should be in the form of "12:00 PM"
    course = data['course']
    description = data['description']
    student = data['student']  # student id
    # a list of uploaded file returned by the upload api
    attachments = data['attachments']

    grade = 0
    progress = 0

    deadline = TaskHelper.create_date(date, time)

    result = TaskHelper.post(title, deadline, course,
                             description, attachments, student, grade, progress)

    return result

# endpoint to get a task by id


@bp.route('/api/task/<id>', methods=['GET'])
def get_task(id):
    return TaskHelper.get(id)

# endpoint to delete a task by id


@bp.route('/api/task/<id>', methods=['DELETE'])
def delete_task(id):
    return TaskHelper.delete(id)

# endpoint to update task by id


@bp.route('/api/task/<id>', methods=['PATCH'])
def update_task(id):
    data = request.get_json()
    print(data)
    title = data['title']
    date = data['date']
    time = data['time']
    course_id = data['course_id']
    description = data['description']
    attachments = data['attachments']

    if ('grade' and 'progress' in data):
        grade = data['grade']
        progress = data['progress']
        result = TaskHelper.update(
            title, date, time, course_id, description, attachments, id, grade, progress)
    else:
        result = TaskHelper.update_without_progress(
            title, date, time, course_id, description, attachments, id)

    return result

# endpoint to get all tasks for a student


@bp.route('/api/task/student', methods=['GET'])
def get_task_by_student():
    student_id = request.args.get('id')
    return TaskHelper.get_by_student(student_id)

# endpoint to get all tasks for a student for a specific course


@bp.route('/api/task/student/course', methods=['GET'])
def get_task_for_student_and_course():
    student = request.args.get('student')
    course = request.args.get('course')
    return TaskHelper.get_by_student_and_course(student, course)
