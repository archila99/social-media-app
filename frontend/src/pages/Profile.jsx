import React from 'react';

export default function Profile() {
    // Mock data for display purposes
    const profile = {
        username: localStorage.getItem("username") || "JaneDoe",
        joined: Date.now() - 31536000000, // Joined 1 year ago
        bio: "Web developer and AI enthusiast. Building SocialAI to connect the world!",
        posts: [
            { id: 1, content: "Finished migrating to CSS Modules!", created_at: Date.now() },
            { id: 2, content: "Enjoying the new development workflow.", created_at: Date.now() - 86400000 },
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-6">
                    <div className="flex items-center space-x-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                            {profile.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                {profile.username}
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Joined {new Date(profile.joined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {profile.bio || "No bio yet. This user hasn't added a bio."}
                        </p>
                    </div>
                </div>

                {/* Posts Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 px-2">
                        Posts by {profile.username}
                    </h2>
                    
                    {profile.posts && profile.posts.length > 0 ? (
                        <div className="space-y-4">
                            {profile.posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition duration-150 hover:shadow-xl"
                                >
                                    <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap mb-3">
                                        {post.content}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
                            <div className="text-6xl mb-4">📝</div>
                            <p className="text-gray-500 text-lg">No posts yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}