# Social Media App - Backend

This is the Flask-powered backend API for a full-stack social media application.
It provides authentication, user management, and AI-enhanced post analysis features
(such as summarization and sentiment detection) using PostgreSQL as the database.

##  Tech Stack

**Backend Framework:** Flask  
**Database:** PostgreSQL (via SQLAlchemy)  
**Authentication:** JWT (Flask-JWT-Extended)  
**AI/NLP:** Transformers (BART, DistilBERT), PyTorch  
**Password Hashing:** Flask-Bcrypt  
**Deployment:** Gunicorn + Render / Heroku (planned)


## Setup

1. **Create and activate virtual environment** (if not already done):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**:
   - Make sure PostgreSQL is running
   - Update `DATABASE_URL` in `.env` file
   - TODO: Run database migrations when implemented

5. **Run the application**:
   ```bash
   python run.py
   ```

   Or using Flask CLI:
   ```bash
   flask run
   ```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py       # Application factory
│   ├── config.py         # Configuration settings
│   ├── models/           # Database models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── post.py
│   └── routes/           # API routes
│       ├── __init__.py
│       ├── auth.py       # Authentication routes
│       ├── posts.py      # Post routes
│       └── users.py      # User routes
├── venv/                 # Virtual environment
├── .env                  # Environment variables (not in git)
├── .env.example          # Example environment variables
├── .gitignore           # Git ignore file
├── requirements.txt     # Python dependencies
├── run.py               # Application entry point
└── README.md            # This file
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/<id>` - Get a specific post
- `PUT /api/posts/<id>` - Update a post
- `DELETE /api/posts/<id>` - Delete a post

### Users
- `GET /api/users` - Get all users
- `GET /api/users/<id>` - Get a specific user
- `PUT /api/users/<id>` - Update a user
- `GET /api/users/<id>/posts` - Get all posts by a user

## TODO

- [ ] Implement database models (User, Post)
- [ ] Set up SQLAlchemy
- [ ] Implement user authentication (JWT)
- [ ] Implement password hashing
- [ ] Implement database migrations
- [ ] Add input validation
- [ ] Add error handling
- [ ] Add authentication middleware
- [ ] Add API documentation
- [ ] Add tests

## Dependencies

- Flask - Web framework
- Flask-CORS - CORS support
- psycopg2-binary - PostgreSQL adapter
- python-dotenv - Environment variable management

