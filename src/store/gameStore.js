import { create } from 'zustand'

export const useGameStore = create(set => ({
  games: [],
  isLoading: false,
  searchFormMessage: '',
  manipulateFormMessage: '',
  gameListMessage: '',
  typeMessage: '',
  editingGame: null,
  setEditingGame: game => set({ editingGame: game }),

  getGames: async () => {
    const API_URL = `${import.meta.env.VITE_API_URL}/games`
    try {
      set({ isLoading: true })
      const response = await fetch(API_URL)
      const data = await response.json()
      if (!response.ok) return set({ games: [], gameListMessage: data.errorMessage, typeMessage: 'error' })
      set({ games: data.games, gameListMessage: '', searchFormMessage: '', manipulateFormMessage: '' })
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  searchGame: async game => {
    const API_URL = `${import.meta.env.VITE_API_URL}/search/${game}`
    try {
      set({ isLoading: true })
      const response = await fetch(API_URL)
      const data = await response.json()
      if (!response.ok) return set({ searchFormMessage: data.errorMessage, typeMessage: 'error' })
      set({ games: data.games, searchFormMessage: '', manipulateFormMessage: '' })
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  createGame: async (game, state) => {
    const API_URL = `${import.meta.env.VITE_API_URL}/create`
    try {
      const POST_CONFIG = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game, state })
      }

      set({ isLoading: true })
      const response = await fetch(API_URL, POST_CONFIG)
      const data = await response.json()
      if (!response.ok) return set({ manipulateFormMessage: data.errorMessage, typeMessage: 'error' })
      set(({ games }) => ({
        games: [...games, data.newGame],
        manipulateFormMessage: data.successMessage,
        typeMessage: 'success'
      }))
      setTimeout(() => {
        set({ manipulateFormMessage: '' })
      }, 4000)
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  deleteGame: async id => {
    const API_URL = `${import.meta.env.VITE_API_URL}/delete/${id}`
    try {
      set({ isLoading: true })
      const response = await fetch(API_URL, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) return set({ gameListMessage: data.errorMessage, typeMessage: 'error' })
      set(({ games }) => ({
        games: games.filter(game => game.id !== id),
        gameListMessage: data.successMessage,
        typeMessage: 'success'
      }))
      setTimeout(() => {
        set({ gameListMessage: '' })
      }, 4000)
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  },

  editGame: async (id, game, state) => {
    const API_URL = `${import.meta.env.VITE_API_URL}/edit`
    try {
      const PUT_CONFIG = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, game, state })
      }
      set({ isLoading: true })
      const response = await fetch(API_URL, PUT_CONFIG)
      const data = await response.json()
      if (!response.ok) return set({ manipulateFormMessage: data.errorMessage, typeMessage: 'error' })
      set(({ games }) => ({
        games: games.map(game => game.id === data.updatedGame.id ? data.updatedGame : game),
        manipulateFormMessage: data.successMessage,
        typeMessage: 'success'
      }))

      setTimeout(() => {
        set({ manipulateFormMessage: '' })
      }, 4000)
    } catch (error) {
      console.log(error)
    } finally {
      set({ isLoading: false })
    }
  }
}))