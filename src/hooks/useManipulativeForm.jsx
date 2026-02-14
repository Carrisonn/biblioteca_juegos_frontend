import { useStore } from '../store/store.js'
import { useEffect, useState } from 'react'
import { useGameAPI } from './useGameAPI'

export function useManipulativeForm() {
  const { addGame, editGame } = useGameAPI()

  const message = useStore(state => state.message)
  const setMessage = useStore(state => state.setMessage)
  const editingGame = useStore(state => state.editingGame)
  const setEditingGame = useStore(state => state.setEditingGame)

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  useEffect(() => {
    if (editingGame) {
      setInputValue(editingGame.game)
      setSelectValue(editingGame.state)
    }
  }, [editingGame])

  function handleSubmit(event) {
    event.preventDefault()

    const game = inputValue.trim().replace(/\b\w/g, character => character.toLocaleUpperCase())
    const state = selectValue
    if (!game || !state) return

    editingGame ? editGame(editingGame.id, game, state) : addGame(game, state)

    setMessage('')
    setInputValue('')
    setSelectValue('')
    setEditingGame(null)
  }

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }

  function handleSelectChange(event) {
    setSelectValue(event.target.value)
  }

  function handleResetForm() {
    setInputValue('')
    setSelectValue('')
    setEditingGame(null)
  }

  const formTitle = editingGame ? 'Editar Juego' : 'Agrega Juegos'
  const buttonText = editingGame ? 'Guardar Cambios' : 'Agregar Juego'

  return {
    message,
    inputValue,
    selectValue,
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    handleResetForm,
    formTitle,
    buttonText
  }
}