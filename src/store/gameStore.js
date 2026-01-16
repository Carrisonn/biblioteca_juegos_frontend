import { create } from 'zustand'
import { postConfig } from '../utils/postConfig.js'
import { putConfig } from '../utils/putConfig.js'

let messageTimeout

export const useGameStore = create((set, get) => ({
  games: [],
  isLoading: false,
  message: '',
  editingGame: null,
  setEditingGame: game => set({ editingGame: game }),

  getGames: async () => {
    set({ isLoading: true })
    const API_URL = `${import.meta.env.VITE_API_URL}/games`

    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      if (!response.ok) return set({ games: [], message: data.errorMessage })

      set({ games: data.games, message: '' })
    } catch (error) {
      //console.log(error)
      set({ message: 'Hubo un problema al obtener los juegos' })
    } finally {
      set({ isLoading: false })
      get().clearMessageWithDelay()
    }
  },

  searchGame: async game => {
    set({ isLoading: true })
    const API_URL = `${import.meta.env.VITE_API_URL}/search/${game}`

    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage })

      set({ games: data.games, message: '' })
    } catch (error) {
      //console.log(error)
      set({ message: 'Hubo un problema al buscar el juego' })
    } finally {
      set({ isLoading: false })
      get().clearMessageWithDelay()
    }
  },

  createGame: async (game, state) => {
    set({ isLoading: true })
    const { API_URL, POST_CONFIG } = postConfig(game, state)

    try {
      const response = await fetch(API_URL, POST_CONFIG)
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage })

      set(({ games }) => ({
        games: [...games, data.newGame],
        message: data.successMessage
      }))

    } catch (error) {
      //console.log(error)
      set({ message: 'Hubo un problema al crear el juego' })
    } finally {
      set({ isLoading: false })
      get().clearMessageWithDelay()
    }
  },

  deleteGame: async id => {
    set({ isLoading: true })
    const API_URL = `${import.meta.env.VITE_API_URL}/delete/${id}`

    try {
      const response = await fetch(API_URL, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage })

      set(({ games }) => ({
        games: games.filter(game => game.id !== id),
        message: data.successMessage
      }))

    } catch (error) {
      //console.log(error)
      set({ message: 'Hubo un problema al borrar el juego' })
    } finally {
      set({ isLoading: false })
      get().clearMessageWithDelay()
    }
  },

  editGame: async (id, game, state) => {
    set({ isLoading: true })
    const { API_URL, PUT_CONFIG } = putConfig(id, game, state)

    try {
      const response = await fetch(API_URL, PUT_CONFIG)
      const data = await response.json()
      if (!response.ok) return set({ message: data.errorMessage })

      set(({ games }) => ({
        games: games.map(game => game.id === data.updatedGame.id ? data.updatedGame : game),
        message: data.successMessage
      }))

    } catch (error) {
      //console.log(error)
      set({ message: 'Hubo un problema al editar el juego' })
    } finally {
      set({ isLoading: false })
      get().clearMessageWithDelay()
    }
  },

  clearMessageWithDelay: () => {
    if (messageTimeout) clearTimeout(messageTimeout)

    messageTimeout = setTimeout(() => {
      set({ message: '' })
      messageTimeout = null
    }, 1000)
  }
}))