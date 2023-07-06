import { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const [loggedInUserName, setLoggedInUserName] = useState('')

  useEffect(() => {
    const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUserData'))
    if (loggedInUserData && loggedInUserData.username) {
      setLoggedInUserName(loggedInUserData.username)
    }
    if (loggedInUserData && loggedInUserData.token) {
      Cookies.set('token', loggedInUserData.token)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        loggedInUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
