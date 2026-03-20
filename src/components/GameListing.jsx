import { useGameListing } from '../hooks/useGameListing.jsx'
import { useStore } from '../store/store.js'
import { GameCard } from './GameCard.jsx'
import { Toast } from './Toast.jsx'
import styles from './GameListing.module.css'

export function GameListing() {
  const { games, sortedGames } = useGameListing()
  const totalGames = useStore(state => state.totalGames)
  const message = useStore(state => state.message)
  const isLoading = useStore(state => state.isLoading)

  return (
    <>
      {message && <Toast message={message} />}

      <h2>Lista de <span className="primary-color">Juegos</span></h2>
      <p className={styles.game_stats}>Juegos Totales: {totalGames}</p>
      <p className={styles.game_stats}>Juegos Encontrados: {games.length}</p>

      <div className={styles.game_info}>
        <h3>Nombre</h3>
        <h3>Terminado</h3>
      </div>

      <div className={styles.game_list}>
        {
          isLoading
            ? <div className="loader"></div>
            : sortedGames.map(game => <GameCard key={game.id} game={game} />)
        }
      </div>
    </>
  )
}