from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# lets us talk with PostgreSQL easily
db = SQLAlchemy() 
# securely hashes passwords
bcrypt = Bcrypt()


# defines a database table users with these columns
class User(db.Model):
    __tablename__ = 'users'

    # an intiger as a primary key
    id = db.Column(db.Integer, primary_key=True) 
    # unique username 
    username = db.Column(db.String(100), nullable=False, unique=True)
    # unique email
    email = db.Column(db.String(120), nullable=False, unique=True)
    # hashed password never stores plain text
    password_hash = db.Column(db.String(128), nullable=False)

    # hashes password before saving it 
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')


    # verify hashed password
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


class Post(db.Model):
    __tablename__ = 'posts'

    id= db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    
    # relationship to User model
    user = db.relationship('User', backref=db.backref('posts', lazy=True))