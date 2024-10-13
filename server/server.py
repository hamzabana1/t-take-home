from flask import Flask, jsonify
from flask_cors import CORS
from services.report_service import serve as grpc_serve
import threading

# Create an instance of the Flask application
app = Flask(__name__)
CORS(app)

# Define a route for the root path "/"
@app.route("/")
def hello_world():
  return jsonify({
    "message" : "hi"
  })

# Run the Flask server
if __name__ == "__main__":
  # Start gRPC server in a separate thread
  grpc_thread = threading.Thread(target=grpc_serve)
  grpc_thread.start()
  app.run(debug=True, port=8080)