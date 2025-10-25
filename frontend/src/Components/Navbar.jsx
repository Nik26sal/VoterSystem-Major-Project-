import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from memory instead of localStorage
    navigate("/login");
  };

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-white shadow fixed top-0 left-0 z-20">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1
            onClick={() => goTo("/dashboard")}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            VoteX
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 items-center">
            <button onClick={() => goTo("/dashboard")} className="hover:text-blue-600">
              Dashboard
            </button>
            <button onClick={() => goTo("/")} className="hover:text-blue-600">
              Events
            </button>
            <button onClick={() => goTo("/profile/1")} className="hover:text-blue-600">
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed top-16 left-0 right-0 bg-white shadow-lg z-10 md:hidden">
          <div className="flex flex-col p-4 space-y-3">
            <button onClick={() => goTo("/dashboard")} className="text-left py-2 hover:text-blue-600">
              Dashboard
            </button>
            <button onClick={() => goTo("/")} className="text-left py-2 hover:text-blue-600">
              Events
            </button>
            <button onClick={() => goTo("/profile/1")} className="text-left py-2 hover:text-blue-600">
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-0 md:hidden"
        />
      )}
    </>
  );
}