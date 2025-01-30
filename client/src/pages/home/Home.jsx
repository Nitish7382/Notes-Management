import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleLogin = () =>{
    navigate("/login")
  };
  
  const handleSignup = () => {
    navigate("/signup")
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 bg-white shadow-lg rounded-b-2xl">
        <h1 className="text-3xl font-extrabold text-blue-700">NoteEase</h1>
        <button onClick={handleLogin} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all">Sign In</button>
      </header>

      {/* Hero Section */}
      <section className="text-center mt-16 max-w-3xl px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">Manage Your Notes with Ease</h2>
        <p className="text-gray-700 mt-4 text-lg">Organize, edit, and access your notes anytime, anywhere with NoteEase.</p>
        <button onClick={handleSignup} className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-all shadow-md">Get Started</button>
      </section>

      {/* Features Section */}
      <section id="features" className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-700">Cloud Sync</h3>
          <p className="text-gray-600 mt-3">Access your notes from any device.</p>
        </div>
        {/* <div className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-700">Rich Formatting</h3>
          <p className="text-gray-600 mt-3">Use bold, italics, and more.</p>
        </div> */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-700">Secure Storage</h3>
          <p className="text-gray-600 mt-3">Your notes are encrypted and safe.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 w-full text-center text-gray-700 py-6 bg-white shadow-t-lg rounded-t-2xl">
        <p>&copy; 2025 NoteEase. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
