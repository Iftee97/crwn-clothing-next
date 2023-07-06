import { useState, useEffect, createContext } from 'react'

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(false)

  function toggleSidebar() {
    setShowSidebar(!showSidebar)
  }

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
