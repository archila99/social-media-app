"""
Script to reset the database - drops all tables and recreates them.
WARNING: This will delete all data!

Usage:
    python reset_db.py
"""
from app import app, db
from models import User, Post

if __name__ == '__main__':
    with app.app_context():
        # Drop all tables
        print("Dropping all tables...")
        db.drop_all()
        
        # Create all tables
        print("Creating all tables...")
        db.create_all()
        
        print("✅ Database reset complete!")
        print("All tables have been dropped and recreated with the new schema.")
