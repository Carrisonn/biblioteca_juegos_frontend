import { useStore } from '../store/store.js'
import { postConfig } from '../utils/postConfig.js'
import { putConfig } from '../utils/putConfig.js'

export function useGameAPI() {
  const setGames = useStore(state => state.setGames)
  const setTotalGames = useStore(state => state.setTotalGames)
  const addGameToStore = useStore(state => state.addGameToStore)
  const editGameFromStore = useStore(state => state.editGameFromStore)
  const deleteGameFromStore = useStore(state => state.deleteGameFromStore)
  const setMessage = useStore(state => state.setMessage)
  const setIsLoading = useStore(state => state.setIsLoading)

  const getGames = async () => {
    setIsLoading(true)
    const API_URL = `${import.meta.env.VITE_API_URL}/games`

    try {
      const response = await fetch(API_URL)
      const { games, totalGames, errorMessage } = await response.json()
      if (!response.ok) return setMessage(errorMessage)

      setGames(games)
      setTotalGames(totalGames)
    } catch (error) {
      console.log(error)
      setMessage('Hubo un problema al obtener los juegos')
    } finally {
      setIsLoading(false)
    }
  }

  const searchGame = async game => {
    setIsLoading(true)
    const API_URL = `${import.meta.env.VITE_API_URL}/games/${game}`

    try {
      const response = await fetch(API_URL)
      const { games, errorMessage } = await response.json()
      if (!response.ok) return setMessage(errorMessage)

      setGames(games)
    } catch (error) {
      console.log(error)
      setMessage({ message: 'Hubo un problema al buscar el juego' })
    } finally {
      setIsLoading(false)
    }
  }

  const addGame = async (game, state) => {
    setIsLoading(true)
    const { API_URL, POST_CONFIG } = postConfig(game, state)

    try {
      const response = await fetch(API_URL, POST_CONFIG)
      const { newGame, totalGames, errorMessage, successMessage } = await response.json()
      if (!response.ok) return setMessage(errorMessage)

      addGameToStore(newGame)
      setTotalGames(totalGames)
      setMessage(successMessage)
    } catch (error) {
      console.log(error)
      setMessage('Hubo un problema al crear el juego')
    } finally {
      setIsLoading(false)
    }
  }

  const editGame = async (id, game, state) => {
    setIsLoading(true)
    const { API_URL, PUT_CONFIG } = putConfig(id, game, state)

    try {
      const response = await fetch(API_URL, PUT_CONFIG)
      const { updatedGame, errorMessage, successMessage } = await response.json()
      if (!response.ok) return setMessage(errorMessage)

      editGameFromStore(updatedGame)
      setMessage(successMessage)
    } catch (error) {
      console.log(error)
      setMessage('Hubo un problema al editar el juego')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteGame = async id => {
    setIsLoading(true)
    const API_URL = `${import.meta.env.VITE_API_URL}/games/${id}`

    try {
      const response = await fetch(API_URL, { method: 'DELETE' })
      const { deletedGame, totalGames, errorMessage, successMessage } = await response.json()
      if (!response.ok) return setMessage(errorMessage)

      deleteGameFromStore(deletedGame)
      setTotalGames(totalGames)
      setMessage(successMessage)
    } catch (error) {
      console.log(error)
      setMessage('Hubo un problema al borrar el juego')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getGames,
    searchGame,
    addGame,
    editGame,
    deleteGame
  }
}