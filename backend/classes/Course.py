from backend.databases import DB


class Course(object):
    def __init__(self, name, instructor, _id):
        # set up attributes
        self._id = _id
        self.name = name
        self.instructor = instructor
        self.students = []

    def insert(self):
        # if the course isn't already there in the database then add it
        if not DB.find_one("Courses", {"_id": self._id}):
            # jsonify the input python object so it's appropriate data type to be added to database
            DB.insert(collection='Courses', data=self.json())
