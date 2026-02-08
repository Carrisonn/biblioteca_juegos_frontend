import { useEffect, useId, useState } from 'react'
import { useStore } from '../store/store.js'
import { useGameAPI } from '../hooks/useGameAPI.jsx'
import { Toast } from './Toast.jsx'

export function ManipulateForm() {
  const { addGame, editGame } = useGameAPI()
  const message = useStore(state => state.message)
  const setMessage = useStore(state => state.setMessage)
  const editingGame = useStore(state => state.editingGame)
  const setEditingGame = useStore(state => state.setEditingGame)

  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  const idForm = useId()
  const idInput = useId()
  const idSelect = useId()

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

  return (
    <>
      {message && <Toast message={message} />}

      <h2>{formTitle.slice(0, 6)} <span className='primary-color'>{formTitle.slice(7)}</span></h2>

      <form onSubmit={handleSubmit} id={idForm} method='POST'>
        <div className='inputs_wrapper'>
          <input
            type="text"
            form={idForm}
            name={idInput}
            value={inputValue}
            onChange={handleInputChange}
            autoComplete='off'
            placeholder='¿Qué has jugado hoy?'
            required
          />

          <select value={selectValue} onChange={handleSelectChange} name={idSelect} form={idForm} required>
            <option value='' hidden>¿Lo has terminado?</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className='buttons_wrapper'>
          <button onClick={handleResetForm} type='button'>Deshacer cambios</button>
          <button type='submit'>{buttonText}</button>
        </div>
      </form>

    </>
  )
}