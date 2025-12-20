import { createContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   console.log("User updated:", user);
  // }, [user]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/checkAuth");
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async ({ email, password, role }) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post(
        `/${role === "voter" ? "voter/loginVoter" : "admin/loginAdmin"}`,
        { email, password }
      );

      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/voter/createVoter", {
        name,
        email,
        password,
      });
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

 
  const logout = async () => {
    try {
      if (!user) return;

      await api.post(
        `/${user.role === "voter" ? "voter/logoutVoter" : "admin/logoutAdmin"}`
      );
    } finally {
      setUser(null);
    }
  };

  const profileFetch = async (id) => {
    const { data } = await api.get(
      `/${user.role === "voter"
        ? `voter/profileVoter/${id}`
        : `admin/profileAdmin/${id}`}`
    );
    return data.user;
  };

  const checkCandidate = async (email, name) => {
  const data = await api.post("/admin/checkCandidate", {
    email,
    name,
  });
  console.log(data)
  return data.data.exists === true;
};


  const createEvent = async (eventData) => {
    console.log("Creating event with data:", eventData);
    const { data } = await api.post("/admin/createEvent", eventData);
    return data;
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
        profileFetch,
        createEvent,
        checkCandidate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
