import { useState } from 'react'
import { useStore } from '../store/store.js'
import { config } from '../utils/config.js'
import { useMessageHandler } from './useMessageHandler.jsx'

export function useGameAPI() {
  const setGames = useStore(state => state.setGames)
  const setTotalGames = useStore(state => state.setTotalGames)
  const addGameToStore = useStore(state => state.addGameToStore)
  const editGameFromStore = useStore(state => state.editGameFromStore)
  const deleteGameFromStore = useStore(state => state.deleteGameFromStore)
  const setIsLoading = useStore(state => state.setIsLoading)
  const { messageHandler } = useMessageHandler()
  const [APIStatus, setAPIStatus] = useState({ text: 'Comprobando servicio', onLine: false })

  const getGames = async game => {
    setIsLoading(true)
    const API_URL = game
      ? `${import.meta.env.VITE_API_URL}/games?search=${encodeURIComponent(game)}`
      : `${import.meta.env.VITE_API_URL}/games`

    try {
      const response = await fetch(API_URL)
      const { games, totalGames, message } = await response.json()
      if (!response.ok) return messageHandler({ message, statusCode: response.status })

      setGames(games)
      setTotalGames(totalGames)
    } catch {
      // console.log(error)
      messageHandler({ message: 'Hubo un problema al obtener los juegos, inténtalo más tarde' })
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
      if (!response.ok) return messageHandler({ message, statusCode: response.status })

      addGameToStore(newGame)
      setTotalGames(totalGames)
      messageHandler({ message })
    } catch {
      // console.log(error)
      messageHandler({ message: 'Hubo un problema al crear el juego, inténtalo más tarde' })
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
      if (!response.ok) return messageHandler({ message, statusCode: response.status })

      editGameFromStore(updatedGame)
      messageHandler({ message })
    } catch {
      // console.log(error)
      messageHandler({ message: 'Hubo un problema al editar el juego' })
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
      if (!response.ok) return messageHandler({ message, statusCode: response.status })

      deleteGameFromStore(deletedGame)
      setTotalGames(totalGames)
      messageHandler({ message })
    } catch {
      // console.log(error)
      messageHandler('Hubo un problema al borrar el juego')
    } finally {
      setIsLoading(false)
    }
  }

  const checkAPI = async () => {
    const API_URL = `${import.meta.env.VITE_API_URL}/health`

    try {
      const response = await fetch(API_URL)
      const { text, onLine } = await response.json()
      setAPIStatus({ text, onLine })
    } catch {
      // console.log(error)
      setAPIStatus({ text: 'Servicio fuera de línea', onLine: false })
    }
  }

  return {
    getGames,
    addGame,
    editGame,
    deleteGame,
    checkAPI,
    APIStatus
  }
}