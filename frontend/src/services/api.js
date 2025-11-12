import axios from 'axios';

// Create axios instance with credentials enabled for session cookies
const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true, // This is crucial for session cookies to work
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

