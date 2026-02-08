import { create } from 'zustand'

export const useStore = create(set => ({
  games: [],
  isLoading: false,
  message: '',
  editingGame: null,

  setGames: games => set({ games }),
  setEditingGame: game => set({ editingGame: game }),
  setIsLoading: boolean => set({ isLoading: boolean }),
  setMessage: message => set({ message }),

  addGameToStore: game => {
    return set(state => ({
      games: [...state.games, game]
    }))
  },

  deleteGameFromStore: deletedGame => {
    return set(state => ({
      games: state.games.filter(game => game.id !== deletedGame.id)
    }))
  },

  editGameFromStore: updatedGame => {
    return set(state => ({
      games: state.games.map(game => game.id === updatedGame.id ? updatedGame : game)
    }))
  }
}))