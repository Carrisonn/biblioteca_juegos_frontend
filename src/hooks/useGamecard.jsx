import { useGameAPI } from '../hooks/useGameAPI.jsx'
import { useStore } from '../store/store.js'
import { useScroll } from '../hooks/useScroll.jsx'
import { cancelActionModal } from '../utils/mixins.js'

export function useGameCard() {
  const { deleteGame } = useGameAPI()
  const { scrollTo } = useScroll()
  const setEditingGame = useStore(state => state.setEditingGame)

  const handleEditingGame = game => {
    if (!game) return

    scrollTo({})
    setEditingGame(game)
  }

  const handleDeleteGame = async ({ game, id }) => {
    if (!game || !id) return

    const result = await cancelActionModal.fire({
      title: `¿Estás seguro de querer eliminar ${game}?`,
      confirmButtonText: `Si, elimina ${game}`
    })

    if (result.isConfirmed) deleteGame(id)
  }

  return {
    handleEditingGame,
    handleDeleteGame
  }
}