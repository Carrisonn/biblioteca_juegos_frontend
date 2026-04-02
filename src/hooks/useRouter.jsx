import { useEffect, useState } from 'react'

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  window.dispatchEvent(new Event('routerchange')) // own event
  window.dispatchEvent(new PopStateEvent('popstate'))

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('routerchange', handlePathChange)
    window.addEventListener('popstate', handlePathChange)

    return () => {
      window.removeEventListener('routerchange', handlePathChange)
      window.removeEventListener('popstate', handlePathChange)
    }
  }, [currentPath])

  return { currentPath }
}