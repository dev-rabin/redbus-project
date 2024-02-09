import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] =  useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  const storeToken = (serverToken) => {
    console.log("Received server token:", serverToken);
    if (serverToken) {
      console.log("Setting token in state and localStorage:", serverToken);
      setToken(serverToken);
      localStorage.setItem("token", serverToken);
    } else {
      console.warn("Received empty or undefined token.");
    }
  };
  
  const logOutUser = () => {
    setToken("")
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!token;
  console.log("USer login status : ", isLoggedIn);

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        console.log(data.userData);
      } else {
        setUser(null); // Reset user data if unauthorized or other error
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null); // Reset user data on fetch error
    }
  };

  useEffect(() => {
   getUserData();
   console.log("useEffect calling...",);
  }, []);
  console.log("useEffect calling 1...");

  return (
    <AuthContext.Provider value={{ storeToken,logOutUser, isLoggedIn, user}}>
    {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
