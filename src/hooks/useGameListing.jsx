import { useEffect, useMemo } from 'react'
import { useStore } from '../store/store.js'
import { useGameAPI } from '../hooks/useGameAPI.jsx'

export function useGameListing() {
  const { getGames } = useGameAPI()
  const games = useStore(state => state.games)

  useEffect(() => {
    if (games.length === 0) getGames()
  }, [games])

  const sortedGames = useMemo(() => {
    return [...games].sort((obj1, obj2) => obj1.game.localeCompare(obj2.game, "es", { sensitivity: "base" }))
  }, [games])

  return {
    games,
    sortedGames,
  }
}