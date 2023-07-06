import { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const router = useRouter()

  const toggleSidebar = () => {
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
