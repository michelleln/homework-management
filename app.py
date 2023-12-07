import os
from flask import Flask, jsonify, request, make_response, session, redirect
from backend.helpers import StudentHelper, TaskHelper
from flask_session import Session
from backend.databases import DB
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from backend.auth import db, User
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
app.secret_key = "123"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = datetime.timedelta(days=1) 

DB.init()
bcrypt = Bcrypt(app)

db.init_app(app)

with app.app_context():
    db.create_all()

CORS(app, supports_credentials=True)

@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def login_user():
    email = request.json["email"]
    password = request.json["password"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    return jsonify({
        "id": user.id
    })

# endpoint to register a student
@app.route('/api/students', methods=['POST'])
def post_student():
    data = request.get_json()
    firstName = data["first_name"]
    lastName = data["last_name"]
    email = data["email"]
    _id = data["_id"]

    StudentHelper.post(firstName, lastName, email, _id)
    return jsonify("Successfully added student"), 200

# endpoint to get student detail by id
@app.route('/api/students', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_student():
    id = request.args.get('id')
    return StudentHelper.get(id)

# endpoint to create a task
@app.route('/api/tasks', methods=['POST'])
def post_task():
    data = request.get_json(silent=True)
    title = data['title']
    date = data['date']  
    time = data['time']  
    course = data['course']
    description = data['description']
    student = data['student']  # student id
    # a list of uploaded file returned by the upload api


    deadline = TaskHelper.create_date(date, time)

    result = TaskHelper.post(title, deadline, course, description, student)

    return result

# endpoint to get all tasks for a student
@app.route('/api/tasks/student', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_task_by_student():
    student_id = request.args.get('id')
    return TaskHelper.get_by_student(student_id)

# endpoint to get all distinct courses the student is taking
@app.route('/api/tasks/course', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_courses_by_student():
    student_id = request.args.get('student_id')
    return TaskHelper.get_distinct_courses(student_id)

# get tasks within range of deadline
@app.route('/api/tasks/deadline', methods=['GET'])
#@authenticate_user
@cross_origin(supports_credentials=True)
def get_tasks_by_deadline_month():
    #print(session)
    year = int(request.args.get('year'))
    month = int(request.args.get('month'))
    student_id = request.args.get('student')
    return TaskHelper.get_tasks_by_deadline_month(student_id, year, month)


if __name__ == "__main__":
    
    app.run('localhost')