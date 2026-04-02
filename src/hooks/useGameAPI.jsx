import { useState } from 'react'
import { useStore } from '../store/store.js'
import { config } from '../utils/config.js'

export function useGameAPI() {
  const setGames = useStore(state => state.setGames)
  const setTotalGames = useStore(state => state.setTotalGames)
  const addGameToStore = useStore(state => state.addGameToStore)
  const editGameFromStore = useStore(state => state.editGameFromStore)
  const deleteGameFromStore = useStore(state => state.deleteGameFromStore)
  const setMessage = useStore(state => state.setMessage)
  const setIsLoading = useStore(state => state.setIsLoading)
  const [APIHealthText, setAPIHealthText] = useState('')

  const getGames = async () => {
    setIsLoading(true)
    const API_URL = `${import.meta.env.VITE_API_URL}/games`

    try {
      const response = await fetch(API_URL)
      const { games, totalGames, message } = await response.json()
      if (!response.ok) return setMessage(message)

      setGames(games)
      setTotalGames(totalGames)
    } catch (error) {
      // console.log(error)
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
      const { games, message } = await response.json()
      if (!response.ok) return setMessage(message)

      setGames(games)
    } catch (error) {
      // console.log(error)
      setMessage({ message: 'Hubo un problema al buscar el juego' })
    } finally {
      setIsLoading(false)
    }
  }

  const addGame = async (...data) => {
    setIsLoading(true)
    const { API_URL, CONFIG } = config(null, data, 'POST')

    try {
      const response = await fetch(API_URL, CONFIG)
      const { newGame, totalGames, message } = await response.json()
      if (!response.ok) return setMessage(message)

      addGameToStore(newGame)
      setTotalGames(totalGames)
      setMessage(message)
    } catch (error) {
      // console.log(error)
      setMessage('Hubo un problema al crear el juego')
    } finally {
      setIsLoading(false)
    }
  }

  const editGame = async (id, ...data) => {
    setIsLoading(true)
    const { API_URL, CONFIG } = config(id, data, 'PUT')

    try {
      const response = await fetch(API_URL, CONFIG)
      const { updatedGame, message } = await response.json()
      if (!response.ok) return setMessage(message)

      editGameFromStore(updatedGame)
      setMessage(message)
    } catch (error) {
      // console.log(error)
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
      const { deletedGame, totalGames, message } = await response.json()
      if (!response.ok) return setMessage(message)

      deleteGameFromStore(deletedGame)
      setTotalGames(totalGames)
      setMessage(message)
    } catch (error) {
      // console.log(error)
      setMessage('Hubo un problema al borrar el juego')
    } finally {
      setIsLoading(false)
    }
  }

  const checkAPI = async () => {
    setIsLoading(true)
    const API_URL = `${import.meta.env.VITE_API_URL}/health`

    try {
      const response = await fetch(API_URL)
      if (!response.ok) return 'La API no esta disponible'

      const text = await response.text()
      setAPIHealthText(text)
    } catch (error) {
      // console.log(error)
      return 'Hubo un error al comprobar la salud de la API'
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getGames,
    searchGame,
    addGame,
    editGame,
    deleteGame,
    checkAPI,
    APIHealthText
  }
}