import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const isBrowser = typeof window !== 'undefined'

  const [value, setValue] = useState(() => {
    if (isBrowser) {
      const jsonValue = localStorage.getItem(key)
      if (jsonValue != null) {
        return JSON.parse(jsonValue)
      }
    }

    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [isBrowser, key, value])

  return [value, setValue]
}
