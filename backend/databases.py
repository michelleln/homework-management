import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


class DB(object):

    uri = "mongodb+srv://lehnhung28:ZinGfix3mV8Liw6x@cluster0.k06gnyf.mongodb.net/?retryWrites=true&w=majority"

    @staticmethod
    def init():
        client = MongoClient(DB.uri)
        DB.DATABASE = client['collection']

    @staticmethod
    def insert(collection, data):
        DB.DATABASE[collection].insert(data)

    @staticmethod
    def find_one(collection, query):
        return DB.DATABASE[collection].find_one(query)

    @staticmethod
    def find(collection, query):
        return DB.DATABASE[collection].find(query)

    # need delete and update methods
    @staticmethod
    def remove(collection, query):
        DB.DATABASE[collection].remove(query)

    @staticmethod
    def update(collection, query, update, option=False):
        DB.DATABASE[collection].update(query, update, option)
