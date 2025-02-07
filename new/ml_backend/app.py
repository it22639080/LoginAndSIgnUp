from flask import Flask, jsonify
from pymongo import MongoClient
from sklearn.cluster import KMeans
import numpy as np

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")
db = client["mern-ml"]
users_collection = db["users"]

@app.route("/cluster", methods=["GET"])
def cluster_users():
    users = list(users_collection.find({}, {"_id": 0, "latitude": 1, "longitude": 1}))
    coords = np.array([[u["latitude"], u["longitude"]] for u in users])
    
    kmeans = KMeans(n_clusters=3).fit(coords)
    labels = kmeans.labels_.tolist()

    for i, user in enumerate(users):
        user["cluster"] = labels[i]

    return jsonify(users)

if __name__ == "__main__":
    app.run(port=5001, debug=True)
