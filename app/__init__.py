from flask import Flask
import pyrebase
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask_session import Session

firebaseConfig = {
    "apiKey" : "AIzaSyAiXd3qDyRndl-zG4Zz9kCzpFMmXEwbWDg",
    "authDomain" : "emovie-22d92.firebaseapp.com",
    "projectId" : "emovie-22d92",
    "storageBucket" : "emovie-22d92.appspot.com",
    "messagingSenderId" : "76805579553",
    "appId" : "1:76805579553:web:5b41fdbcb59dcae5159460",
    "databaseURL" : "https://emovie-22d92-default-rtdb.asia-southeast1.firebasedatabase.app/" 
}

def create_app():
    app = Flask(__name__)

    app.secret_key = "emovie"
    fb = pyrebase.initialize_app(firebaseConfig)
    app.auth = fb.auth()
    app.db = fb.database()

    from .routes import main
    
    app.register_blueprint(main)

    return app