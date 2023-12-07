import pymongo
from pymongo import MongoClient
from pymongo.server_api import ServerApi

class DB:
    def init():
        DB.URI = "mongodb+srv://lehnhung28:TsKJMYVNwJDZkZeW@cluster0.k06gnyf.mongodb.net/?retryWrites=true&w=majority"
        DB.client = MongoClient(DB.URI)
        DB.DATABASE = DB.client["collections"]

    def insert(collection, data):
        DB.DATABASE[collection].insert_one(data)

    def find_one(collection, query):
        return DB.DATABASE[collection].find_one(query)

    def find(collection, query):
        return DB.DATABASE[collection].find(query)

    def find_distinct(collection, attribute, query):
        return DB.DATABASE[collection].distinct(attribute, query)
    
    # need delete and update methods
    def remove(collection, query):
        DB.DATABASE[collection].delete_one(query)

    def update(collection, query, update, upsert=False):
        DB.DATABASE[collection].update(query, update, upsert)
