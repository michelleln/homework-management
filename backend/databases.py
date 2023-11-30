import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


class DB(object):

    uri = "mongodb+srv://lehnhung28:ZinGfix3mV8Liw6x@cluster0.k06gnyf.mongodb.net/?retryWrites=true&w=majority"

    @staticmethod
    def init():
        client = MongoClient(DB.uri)
        DB.DATABASE = client['collection']
        try:
            client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)
