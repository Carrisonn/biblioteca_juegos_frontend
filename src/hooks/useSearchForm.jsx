import { useState } from 'react'
import { useGameAPI } from '../hooks/useGameAPI.jsx'
import { useStore } from '../store/store.js'

export function useSearchForm() {
  const { getGames } = useGameAPI()

  const setMessage = useStore(state => state.setMessage)
  const message = useStore(state => state.message)

  const [inputValue, setInputValue] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const game = inputValue.trim()
    if (!game) return

    setMessage('')
    getGames(game)
    setInputValue('')
  }

  function handleInputValue(event) {
    setInputValue(event.target.value)
  }

  function handleResetList() {
    getGames()
    setInputValue('')
  }

  return {
    message,
    inputValue,
    handleSubmit,
    handleInputValue,
    handleResetList
  }
}