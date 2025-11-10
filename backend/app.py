from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from models import db, bcrypt, User
import datetime

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://myuser:mypassword@localhost:5432/mylocaldb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'supersecretkey'  # JWT requires this

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Flask is running and ready to connect to PostgreSQL!"


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

    # Find the user by email
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401

    # Check the password
    if not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401

    # Create a JWT token valid for 1 day
    access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(days=1))

    return jsonify({
        'message': f'Login successful for {user.username}',
        'access_token': access_token
    }), 200


# ----------------- Run App -----------------
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)
