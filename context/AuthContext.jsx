import { useState, useEffect, createContext } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', {})
  const [loggedInUserName, setLoggedInUserName] = useState('')

  useEffect(() => {
    const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUserData'))
    if (loggedInUserData && loggedInUserData.username) {
      setLoggedInUserName(loggedInUserData.username)
    }
    if (loggedInUserData && loggedInUserData.token) {
      Cookies.set('token', loggedInUserData.token)
      Cookies.set('isAdmin', loggedInUserData.isAdmin)
    }
  }, [setLoggedInUserName])

  return (
    <AuthContext.Provider
      value={{
        loggedInUserName,
        setLoggedInUserName,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
