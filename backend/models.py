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
    password_hash = db.Column(db.String(128), nullable=False, unique=True)

    # hashes password before saving it 
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')


    # verify hashed password
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
