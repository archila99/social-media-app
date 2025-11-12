from flask import Flask, request, jsonify, session
from flask_cors import CORS
from functools import wraps
from models import db, bcrypt, User, Post
import datetime
import os

app = Flask(__name__)
# Enable CORS with credentials support for session cookies
# Allow both common React dev ports
CORS(app, supports_credentials=True, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@localhost:5432/mylocaldb' # giving Flask your database's address + login info
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # to suppress a warning message from SQLAlchemy
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'supersecretkey-change-in-production') # Secret key for session encryption

db.init_app(app) # initializes the database connection
bcrypt.init_app(app) # initializes bcrypt for password hashing

# Session-based authentication decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required'}), 401
        return f(*args, **kwargs)
    return decorated_function

with app.app_context(): # creates the database tables if they don't exist
    db.create_all()

# ----------------- Register Endpoint -----------------
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'error': 'Username or email already exists'}), 409

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': f'User {username} registered successfully!'}), 201


# ----------------- Login Endpoint -----------------
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Create session
    session['user_id'] = user.id
    session['username'] = user.username

    return jsonify({
        'message': 'Login successful',
        'username': user.username,
        'user_id': user.id
    }), 200

# ----------------- Logout Endpoint -----------------
@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logout successful'}), 200

# ----------------- Check Auth Status -----------------
@app.route('/api/auth/status', methods=['GET'])
def check_auth():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        if user:
            return jsonify({
                'authenticated': True,
                'username': user.username,
                'user_id': user.id
            }), 200
    return jsonify({'authenticated': False}), 401

# ----------------- Create a Post -----------------
@app.route('/api/posts', methods=['POST'])
@login_required
def create_post():
    try:
        user_id = session['user_id']
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
            
        content = data.get('content')

        if not content:
            return jsonify({'error': 'Content cannot be empty'}), 400

        new_post = Post(user_id=user_id, content=content)
        db.session.add(new_post)
        db.session.commit()

        return jsonify({
            'id': new_post.id,
            'user_id': new_post.user_id,
            'username': new_post.user.username,
            'content': new_post.content,
            'created_at': new_post.created_at.isoformat()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ----------------- Get User Profile -----------------
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)

    # Include user's posts
    posts = [
        {
            'id': post.id,
            'content': post.content,
            'created_at': post.created_at.isoformat()
        } 
        for post in user.posts
    ]

    return jsonify({
        'username': user.username,
        'bio': getattr(user, 'bio', ''),  # optional, if you have bio column
        'joined': user.created_at.isoformat() if hasattr(user, 'created_at') else '',
        'posts': posts
    })


# ----------------- Get All Posts -----------------
@app.route('/api/posts', methods=['GET'])
@login_required
def get_posts():
    try:
        posts = Post.query.order_by(Post.created_at.desc()).all()
        output = [
            {
                'id': p.id,
                'user_id': p.user_id,
                'username': p.user.username,
                'content': p.content,
                'created_at': p.created_at.isoformat()
            }
            for p in posts
        ]
        return jsonify(output), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ----------------- Delete a Post -----------------
@app.route('/api/posts/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    user_id = session['user_id']
    post = Post.query.get_or_404(post_id)

    if post.user_id != user_id:
        return jsonify({'error': 'Unauthorized to delete this post'}), 403

    db.session.delete(post)
    db.session.commit()

    return jsonify({'message': 'Post deleted successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)
