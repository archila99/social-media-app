import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Components (Assuming they are in src/components or imported via an index)
import Login from "./components/Login"; // Assuming you moved these into 'pages'
import Register from "./components/Register"; // Assuming you moved these into 'pages'
import ProtectedRoute from "./components/ProtectedRoute"; // This component must exist

// Pages
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

export default function App() {
  // Authentication check logic (localStorage is a simple way to track user status)
  const username = localStorage.getItem("username"); 

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition"
              >
                SocialAI
              </Link>
              <div className="flex items-center space-x-6">
                {username && (
                  <Link
                    to="/feed"
                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    Feed
                  </Link>
                )}
                {!username && (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 transition font-medium"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition duration-150 font-medium shadow-md"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="text-6xl mb-4">🔍</div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
                  <p className="text-gray-600 text-xl mb-6">Page not found</p>
                  <Link
                    to="/"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-150 shadow-md"
                  >
                    Go Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} SocialAI. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}