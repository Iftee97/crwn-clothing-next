import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isMounted, setIsMounted] = useState(false); // mounted state kept track of to remove weird hydration mismatch error
  const [user, setUser] = useLocalStorage("user", {});
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const loggedInUserData = JSON.parse(
      localStorage.getItem("loggedInUserData")
    );
    if (loggedInUserData) {
      const { token, isAdmin } = loggedInUserData;
      Cookies.set("isAdmin", isAdmin);
      Cookies.set("token", token);
    }

    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleSignOut = () => {
    setUser({});
    localStorage.removeItem("loggedInUserData");
    Cookies.remove("token");
    Cookies.remove("isAdmin");
    router.push("/");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
