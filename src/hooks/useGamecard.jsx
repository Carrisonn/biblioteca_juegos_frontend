import { useGameAPI } from '../hooks/useGameAPI.jsx'
import { useStore } from '../store/store.js'
import { useScroll } from '../hooks/useScroll.jsx'

export function useGameCard() {
  const { deleteGame } = useGameAPI()
  const { scrollTo } = useScroll()
  const setEditingGame = useStore(state => state.setEditingGame)

  const handleEditingGame = game => {
    if (!game) return

    scrollTo({})
    setEditingGame(game)
  }

  const handleDeleteGame = gameId => {
    if (!gameId) return

    deleteGame(gameId)
  }

  return {
    handleEditingGame,
    handleDeleteGame
  }
}