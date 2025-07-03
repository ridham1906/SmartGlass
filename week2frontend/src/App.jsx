// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import ChatbotPage from "./pages/ChatbotPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "react-hot-toast"; 
import { useState, useEffect } from "react";
import Chatbot from "./components/Chatbot";
import reactLogo from "./assets/react.svg";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <Toaster position="top-right" /> 
        <main className="flex-grow pt-6 pb-12 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} /> 
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
