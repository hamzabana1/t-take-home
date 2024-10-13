from mongoengine import Document, StringField

class Report(Document):
    name = StringField(required=True)
    layout = StringField(required=True)