import { useEffect } from 'react'
import { useGameAPI } from '../hooks/useGameAPI.jsx'
import { useStore } from '../store/store.js'

export function APIHealthCheck() {
  const { checkAPI, APIHealthText } = useGameAPI()
  const isLoading = useStore(state => state.isLoading)

  useEffect(() => {
    checkAPI()
  }, [])

  if (isLoading) return <div className="loader" style={{ marginTop: '4rem' }}></div>

  return <h1 style={{ textDecoration: 'none' }}>{APIHealthText}</h1>
}