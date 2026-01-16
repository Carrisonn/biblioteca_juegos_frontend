import { useEffect, useId, useState } from 'react'
import { useGameStore } from '../store/gameStore.js'
import { Toast } from './Toast.jsx'

export function ManipulateForm() {
  const createGame = useGameStore(state => state.createGame)
  const message = useGameStore(state => state.message)
  const editingGame = useGameStore(state => state.editingGame)
  const setEditingGame = useGameStore(state => state.setEditingGame)
  const editGame = useGameStore(state => state.editGame)

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

    const formData = new FormData(event.target)
    const game = formData.get(idInput).trim().replace(/\b\w/g, character => character.toLocaleUpperCase())
    const state = formData.get(idSelect)
    if (!game || !state) return

    editingGame ? editGame(editingGame.id, game, state) : createGame(game, state)

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

      {
        message && <Toast message={message} />
      }
    </>
  )
}