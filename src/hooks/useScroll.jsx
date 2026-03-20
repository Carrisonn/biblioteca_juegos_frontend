import { useEffect, useState } from 'react'

export function useScroll() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      if (scrollY > 600) {
        setShowButton(true)
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);


  const scrollTo = ({ position = 0 }) => {
    window.scrollTo({ top: position, behavior: 'smooth' })
  }

  return {
    showButton,
    scrollTo
  }
}