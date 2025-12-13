import { createContext, useEffect, useState } from "react";
import api from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/"); 
        setUser(data.user);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const login = async ({ email, password, role }) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/login", {
        email,
        password,
        role,
      });

      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("http://localhost:5000/api/voter/createVoter", {
        name,
        email,
        password,
      });

      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
