import pymongo
from pymongo import MongoClient

class DB(object):

    URI = "mongodb+srv://lehnhung28:ZinGfix3mV8Liw6x@cluster0.k06gnyf.mongodb.net/?retryWrites=true&w=majority"

    @staticmethod
    def init():
        client = MongoClient(uri,
                     tls=True,
                     tlsCertificateKeyFile='<path_to_certificate>',
                     server_api=ServerApi('1'))

