import { useEffect, useMemo } from 'react'
import { useGameStore } from '../store/gameStore.js'
import { GameCard } from './GameCard.jsx'
import { Toast } from './Toast.jsx'
import styles from './GameListing.module.css'

export function GameListing() {
  const games = useGameStore(state => state.games)
  const getGames = useGameStore(state => state.getGames)
  const message = useGameStore(state => state.message)
  const isLoading = useGameStore(state => state.isLoading)

  useEffect(() => {
    getGames()
  }, [])

  const sortedGames = useMemo(() => {
    return [...games].sort((obj1, obj2) => obj1.game.localeCompare(obj2.game, "es", { sensitivity: "base" }))
  }, [games])

  return (
    <>
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

      {
        message && <Toast message={message} />
      }
    </>
  )
}