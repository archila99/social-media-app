import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl text-center">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                    Connect, Share, and Discover
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Welcome to SocialAI, the social network powered by intelligent connections.
                    Join the conversation and see what the world is talking about.
                </p>

                <div className="flex justify-center space-x-4">
                    <Link
                        to="/register"
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/login"
                        className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl shadow-md hover:bg-white transition duration-300"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}