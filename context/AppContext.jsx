import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)

  useEffect(() => {
    getCategories()
  }, [])

  function toggleSidebar() {
    setShowSidebar(!showSidebar)
  }

  async function getCategories() {
    try {
      setCategoriesLoading(true)
      const response = await axios.get('https://iftee97.github.io/categories.json')
      setCategories(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setCategoriesLoading(false)
    }
  }

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        toggleSidebar,
        categories,
        categoriesLoading
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
