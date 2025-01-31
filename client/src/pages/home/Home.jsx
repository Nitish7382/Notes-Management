import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCloud, FaLock, FaSignInAlt, FaRocket, FaStickyNote, FaPen } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-200 to-blue-400 flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-3 bg-white shadow-md rounded-b-2xl">
        <h5 className="text-3xl font-bold text-blue-700 flex items-center">
          <FaStickyNote className="mr-3 text-blue-600" /> NoteNexus
        </h5>
        <button
          onClick={handleLogin}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
        >
          <FaSignInAlt className="mr-2" /> Sign In
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center mt-16 max-w-3xl px-6 flex flex-col items-center">
        <h2 className="text-6xl font-extrabold text-gray-800 leading-tight">
          Simplify Your Notes Effortlessly
        </h2>
        <p className="text-gray-700 mt-5 text-xl">
          Organize, edit, and access your notes with ease, anytime, anywhere.
        </p>
        <button
          onClick={handleSignup}
          className="mt-8 flex items-center bg-blue-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition-all shadow-lg"
        >
          <FaRocket className="mr-3" /> Get Started
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl px-6">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center transition-all transform hover:scale-105 flex flex-col items-center">
          <FaCloud className="text-blue-600 text-5xl mb-4" />
          <h3 className="text-2xl font-semibold text-blue-700">Cloud Sync</h3>
          <p className="text-gray-600 mt-3">Access your notes from any device seamlessly.</p>
        </div>
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center transition-all transform hover:scale-105 flex flex-col items-center">
          <FaPen className="text-blue-600 text-5xl mb-4" />
          <h3 className="text-2xl font-semibold text-blue-700">Smart Editing</h3>
          <p className="text-gray-600 mt-3">Format your notes with ease and clarity.</p>
        </div>
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center transition-all transform hover:scale-105 flex flex-col items-center">
          <FaLock className="text-blue-600 text-5xl mb-4" />
          <h3 className="text-2xl font-semibold text-blue-700">Secure Storage</h3>
          <p className="text-gray-600 mt-3">Your notes are encrypted and protected.</p>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
