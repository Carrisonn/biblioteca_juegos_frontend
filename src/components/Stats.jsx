import { useStore } from '../store/store.js'
import styles from './Stats.module.css'

export function Stats() {
  const totalGames = useStore(state => state.totalGames)
  const games = useStore(state => state.games)

  return (
    <>
      <p className={styles.game_stats}>Juegos Totales: {totalGames}</p>
      <p className={styles.game_stats}>Juegos Encontrados: {games?.length}</p>
    </>
  )
}