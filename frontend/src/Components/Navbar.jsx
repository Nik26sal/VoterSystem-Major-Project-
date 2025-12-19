import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white shadow fixed top-0 left-0 z-50">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <h1
            onClick={() =>
              goTo(user ? `/dashboard/${user.id}` : "/login")
            }
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            VoteX
          </h1>

          <div className="hidden md:flex gap-6 items-center">
            <button onClick={() => navigate("/")} className="hover:text-blue-600">
              Events
            </button>

            {user ? (
              <>
                <button
                  onClick={() => navigate(`/dashboard`)}
                  className="hover:text-blue-600"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="hover:text-blue-600"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden z-50">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed top-16 left-0 right-0 bg-white shadow-lg z-50 md:hidden h-screen">
          <div className="flex flex-col p-4 space-y-3">
            <button
              onClick={() => goTo("/")}
              className="text-left py-2 hover:text-blue-600"
            >
              Events
            </button>

            {user ? (
              <>
                <button
                  onClick={() => goTo(`/dashboard`)}
                  className="text-left py-2 hover:text-blue-600"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => goTo(`/profile`)}
                  className="text-left py-2 hover:text-blue-600"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => goTo("/login")}
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
        />
      )}
    </>
  );
}
