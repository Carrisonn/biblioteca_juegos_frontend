import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore.js'
import { GameCard } from './GameCard.jsx'
import styles from './GameListing.module.css'

export function GameListing() {
  const { games, getGames, gameListMessage, typeMessage, isLoading } = useGameStore()

  useEffect(() => {
    getGames()
  }, [])

  return (
    <>
      <h2>Lista de <span className="primary-color">Juegos</span></h2>

      <div className={styles.game_info}>
        <h3>Nombre</h3>
        <h3>Terminado</h3>
      </div>

      {
        gameListMessage && <p className={`feedback_message ${typeMessage}`}>{gameListMessage}</p>
      }

      <div className={styles.game_list}>
        {
          isLoading
            ? <div className="loader"></div>
            : games.map(game => <GameCard key={game.id} game={game} />)
        }
      </div>
    </>
  )
}