from flask import Flask, jsonify, request, Response, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import pyodbc
import json

app = Flask(__name__)
CORS(app)

connection_string = 'Driver={SQL Server};Server=localhost\\SQLEXPRESS;Database=dyslexia_app;Trusted_Connection=yes;'
db = pyodbc.connect(connection_string)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'mp3'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = ALLOWED_EXTENSIONS


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Serve the 'uploads' folder as a static directory


@app.route('/uploads/<filename>')
def serve_uploads(filename):
    root_dir = os.getcwd()
    return send_from_directory(os.path.join(root_dir, 'uploads'), filename)


@app.route('/', methods=['GET'])
def get():
    return jsonify({'message': 'Get api Working'})


@app.route('/api/child/register', methods=['POST'])
def child_register():
    # Retrieve the child details from the request
    username = request.form['username']
    password = request.form['password']
    photo_file = request.files['photo']

    # Check if username already exists
    cursor = db.cursor()
    select_query = "SELECT COUNT(*) FROM child_accounts WHERE username = ?"
    cursor.execute(select_query, (username,))
    count = cursor.fetchone()[0]
    if count > 0:
        return jsonify({'message': 'Username already exists'})

    # Validate file type
    if photo_file and allowed_file(photo_file.filename):
        # Save the uploaded photo
        photo_filename = secure_filename(photo_file.filename)
        photo_path = os.path.join(app.config['UPLOAD_FOLDER'], photo_filename)
        photo_file.save(photo_path)

        # Perform the necessary operations to insert the child into the database
        insert_query = "INSERT INTO child_accounts (username, password, photo) VALUES (?, ?, ?)"
        values = (username, password, photo_path)

        cursor.execute(insert_query, values)
        cursor.commit()

        return jsonify({'message': 'Child registered successfully'})
    else:
        return jsonify({'message': 'Invalid file format'})


@app.route('/api/child/login', methods=['POST'])
def child_login():
    # Retrieve the child login details from the request
    data = request.get_json()
    username = data['username']
    password = data['password']

    # Perform the necessary operations to validate the child's login credentials
    select_query = "SELECT childId, photo,username FROM child_accounts WHERE username = ? AND password = ?"
    values = (username, password)

    cursor = db.cursor()
    cursor.execute(select_query, values)
    child = cursor.fetchone()

    if child:
        child_dict = {'username': child.username,
                      'childId': child.childId, 'photo': child.photo.replace("uploads\\", "")}
        # print(child)
        return jsonify({'message': 'Child login successful', 'data': child_dict})
    else:
        # return jsonify({'message': 'Invalid username or password'})
        return Response("Invalid username or password", status=401, mimetype='application/json')


@app.route('/api/child/edit', methods=['POST'])
def edit_child():
    # Retrieve the edited child information from the request

    child_id = request.form['childId']
    new_username = request.form['username']
    new_photo_file = request.files['photo']

    # Check if the child with the given child_id exists
    cursor = db.cursor()
    select_query = "SELECT COUNT(*) FROM child_accounts WHERE childId = ?"
    cursor.execute(select_query, (child_id,))
    count = cursor.fetchone()[0]
    if count == 0:
        return jsonify({'message': 'Child not found'})

    # Update the child's username if provided
    if new_username:
        update_query = "UPDATE child_accounts SET username = ? WHERE childId = ?"
        cursor.execute(update_query, (new_username, child_id))
        cursor.commit()

    # Update the child's photo if provided
    if new_photo_file and allowed_file(new_photo_file.filename):
        # Save the uploaded photo
        new_photo_filename = secure_filename(new_photo_file.filename)
        new_photo_path = os.path.join(
            app.config['UPLOAD_FOLDER'], new_photo_filename)
        new_photo_file.save(new_photo_path)

        update_query = "UPDATE child_accounts SET photo = ? WHERE childId = ?"
        cursor.execute(update_query, (new_photo_path, child_id))
        cursor.commit()

    return jsonify({'message': 'Child information updated successfully'})


@app.route('/api/register', methods=['POST'])
def register():
    # Retrieve the user details from the request
    name = request.form['name']
    relation = request.form['relation']
    photo_file = request.files['photo']
    voice_file = request.files['voice']
    childId = request.form['childId']

    # Validate file types
    if photo_file and allowed_file(photo_file.filename) and voice_file and allowed_file(voice_file.filename):
        # Save the uploaded files
        photo_filename = secure_filename(photo_file.filename)
        voice_filename = secure_filename(voice_file.filename)

        photo_path = os.path.join(app.config['UPLOAD_FOLDER'], photo_filename)
        voice_path = os.path.join(app.config['UPLOAD_FOLDER'], voice_filename)

        photo_file.save(photo_path)
        voice_file.save(voice_path)

        # Perform the necessary operations to insert the user into the database
        insert_query = "INSERT INTO users (name, relation, photo, voice, childId) VALUES (?, ?, ?, ?, ?)"
        values = (name, relation, photo_path, voice_path, childId)

        cursor = db.cursor()
        cursor.execute(insert_query, values)
        cursor.commit()

        return jsonify({'message': 'User registered successfully'})
    else:
        return jsonify({'message': 'Invalid file format'})


@app.route('/api/getUser/<int:childId>', methods=['GET'])
def get_user(childId):
    # Perform the necessary operations to retrieve user data based on childId
    select_query = "SELECT * FROM users WHERE childId = ?"
    values = (childId,)

    cursor = db.cursor()
    cursor.execute(select_query, values)
    users = cursor.fetchall()

    if users:
        # Convert users to a list of dictionaries
        users_list = []
        for user in users:
            user_dict = {
                'name': user.name,
                'relation': user.relation,
                'photo': user.photo.replace("uploads\\", ""),
                'voice': user.voice.replace("uploads\\", ""),
            }
            users_list.append(user_dict)

        return jsonify({'message': 'User data retrieved successfully', 'data': users_list})
    else:
        return jsonify({'message': 'No users found for the given childId'})


# Define other API endpoints here...


if __name__ == '__main__':
    app.run(debug=True)
