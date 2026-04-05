import { useEffect } from 'react'
import { useGameAPI } from '../hooks/useGameAPI.jsx'
import styles from './APIHealthCheck.module.css'

export function APIHealthCheck() {
  const { checkAPI, APIStatus } = useGameAPI()
  const { text, onLine } = APIStatus
  const pillColor = onLine ? 'green' : 'red'

  useEffect(() => {
    checkAPI()
  }, [])

  return (
    <div className={`${styles.pill} ${pillColor}`}>
      <span className={styles.pill_pulse}></span>
      <span className={styles.pill_text}>{text}</span>
    </div >
  )
}