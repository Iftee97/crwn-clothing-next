import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const router = useRouter();

  // set showUserDropdown to false when route changes
  useEffect(() => {
    setShowUserDropdown(false);
  }, [router.pathname]);

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        toggleSidebar,
        showUserDropdown,
        setShowUserDropdown,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
