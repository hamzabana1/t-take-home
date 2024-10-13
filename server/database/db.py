from urllib.parse import quote_plus
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

username = quote_plus('hamzabana1')
password = quote_plus('onF7i7XJ5M3jFoFW')
cluster = 'cluster0'
authSource = '<authSource>'
authMechanism = '<authMechanism>'

uri = 'mongodb+srv://' + username + ':' + password + '@cluster0.zswhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)