import { useEffect, useMemo } from 'react'
import { useStore } from '../store/store.js'
import { useGameAPI } from '../hooks/useGameAPI.jsx'
import { GameCard } from './GameCard.jsx'
import { Toast } from './Toast.jsx'
import styles from './GameListing.module.css'

export function GameListing() {
  const { getGames } = useGameAPI()

  const games = useStore(state => state.games)
  const message = useStore(state => state.message)
  const isLoading = useStore(state => state.isLoading)

  useEffect(() => {
    if (games.length === 0) getGames()
  }, [games])

  const sortedGames = useMemo(() => {
    return [...games].sort((obj1, obj2) => obj1.game.localeCompare(obj2.game, "es", { sensitivity: "base" }))
  }, [games])

  return (
    <>
      {message && <Toast message={message} />}

      <h2>Lista de <span className="primary-color">Juegos</span></h2>

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