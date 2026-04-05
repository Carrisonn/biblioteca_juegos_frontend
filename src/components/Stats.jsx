import { useGameListing } from '../hooks/useGameListing.jsx'
import { useStore } from '../store/store.js'
import styles from './Stats.module.css'

export function Stats() {
  const { games } = useGameListing()
  const totalGames = useStore(state => state.totalGames)

  return (
    <>
      <p className={styles.game_stats}>Juegos Totales: {totalGames}</p>
      <p className={styles.game_stats}>Juegos Encontrados: {games.length}</p>
    </>
  )
}