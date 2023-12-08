import pymongo
from pymongo import MongoClient
from pymongo.server_api import ServerApi

class DB:
    # Initialize the MongoDB connection and set default database
    def init():
        # MongoDB connection URI
        DB.URI = "mongodb+srv://lehnhung28:TsKJMYVNwJDZkZeW@cluster0.k06gnyf.mongodb.net/?retryWrites=true&w=majority"
        # Connect to MongoDB
        DB.client = MongoClient(DB.URI)
        # Set the default database
        DB.DATABASE = DB.client["collections"]

    # Insert a document into the specified collection
    def insert(collection, data):
        DB.DATABASE[collection].insert_one(data)

    # Find and return one document from the specified collection based on the query
    def find_one(collection, query):
        return DB.DATABASE[collection].find_one(query)

    # Find and return documents from the specified collection based on the query
    def find(collection, query):
        return DB.DATABASE[collection].find(query)

    # Find and return distinct values for a specified attribute in the collection based on the query
    def find_distinct(collection, attribute, query):
        return DB.DATABASE[collection].distinct(attribute, query)

    # Remove a document from the specified collection based on the query
    def remove(collection, query):
        DB.DATABASE[collection].delete_one(query)

    # Update a document in the specified collection based on the query
    def update(collection, query, update, upsert=False):
        DB.DATABASE[collection].update(query, update, upsert)
