import { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const [loggedInUserName, setLoggedInUserName] = useState('')
  const [isAdminUser, setIsAdminUser] = useState(false)

  useEffect(() => {
    const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUserData'))
    if (loggedInUserData && loggedInUserData.username) {
      setLoggedInUserName(loggedInUserData.username)
    }
    if (loggedInUserData && loggedInUserData.token) {
      Cookies.set('token', loggedInUserData.token)
      Cookies.set('isAdmin', loggedInUserData.isAdmin)
    }
    if (loggedInUserData && loggedInUserData.isAdmin) {
      setIsAdminUser(true)
    }
  }, [setLoggedInUserName, setIsAdminUser, isAdminUser])

  useEffect(() => {
    const isAdmin = Cookies.get('isAdmin')
    if (isAdmin === 'true') {
      setIsAdminUser(true)
    }
  }, [Cookies.get('isAdmin'), setIsAdminUser])

  return (
    <AuthContext.Provider
      value={{
        loggedInUserName,
        setLoggedInUserName,
        isAdminUser,
        setIsAdminUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
