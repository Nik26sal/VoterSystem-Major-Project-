import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import api from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminEvents, setAdminEvents] = useState([]);
  const [adminEventsLoading, setAdminEventsLoading] = useState(false);
  // const [allEventsData, setAllEventsData] = useState([]);

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
      toast.success("Login successful");
      return data.user;
    } catch (err) {
      // setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
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
      toast.success("Logout successful");
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

  //   const createCandidate = async (candidate) => {
  //   const data = await api.post("/candidate/createCandidate", {
  //     candidate
  //   });
  //   return data;
  // };

  const createEvent = async (eventData) => {
    console.log("Creating event with data:", eventData);
    const { data } = await api.post("/admin/createEvent", eventData);
    return data;
  };

  const allEvents = async () => {
    const { data } = await api.get("/event/allEvents");
    // setAllEventsData(data.events);
    return data.events;
  }
  const getAdminEvents = async (adminId) => {
    try {
      setAdminEventsLoading(true);
      const res = await api.get(
        `/admin/event/${adminId}`,
        { withCredentials: true }
      );

      if (res.data?.success) {
        setAdminEvents(res.data.events);
        return res.data.events;
      }
    } catch (error) {
      console.error("Get Admin Events Error:", error);
      return [];
    } finally {
      setAdminEventsLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const role = (user.role === 'admin')?'Admin':'Voter';
      const res = await api.put(`/${role}/changePassword`,{
        oldPassword:currentPassword,
        newPassword
      })
      toast.success("Password changed successfully redirecting to profile...");
      return res;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Password change failed");
      return error;
    }
  }

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
        allEvents,
        adminEvents,
        adminEventsLoading,
        getAdminEvents,
        changePassword,
        // createCandidate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
