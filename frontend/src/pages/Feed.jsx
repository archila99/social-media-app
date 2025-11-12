import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Feed() {
  // Mock data/functions for display purposes
  const username = localStorage.getItem("username") || "User123";
  const posts = [
      { id: 1, username: 'JaneDoe', content: 'This is my first post!', created_at: Date.now() - 3600000 },
      { id: 2, username: username, content: 'Testing out the new component structure!', created_at: Date.now() },
  ];
  const [newPost, setNewPost] = useState('');
  
  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.reload(); // Simple way to trigger re-route and re-render
  };
  
  const handleSubmit = (e) => { e.preventDefault(); console.log('Posted:', newPost); setNewPost(''); };
  const handleDelete = (id) => console.log('Deleting:', id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-8 px-4">
      <div className="max-w-2xl w-full space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 w-full flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Feed</h2>
            <p className="text-gray-500 text-sm mt-1">Welcome back, {username}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg transition duration-150 shadow-md hover:shadow-lg font-medium"
          >
            Logout
          </button>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-150 text-gray-900 placeholder-gray-400"
              rows="4"
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl transition duration-150 shadow-md hover:shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newPost.trim()}
              >
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Posts */}
        <div className="w-full space-y-4">
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 text-lg">No posts yet. Be the first to share something!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition duration-150 hover:shadow-xl relative group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {post.username?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{post.username || "Anonymous"}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {post.username === username && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition duration-150 text-sm font-medium"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}