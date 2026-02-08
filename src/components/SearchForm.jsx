import { useId, useState } from 'react'
import { useGameAPI } from '../hooks/useGameAPI.jsx'
import { useStore } from '../store/store.js'
import { Toast } from './Toast.jsx'

export function SearchForm() {
  const { searchGame, getGames } = useGameAPI()
  const setMessage = useStore(state => state.setMessage)
  const message = useStore(state => state.message)

  const idForm = useId()
  const idInput = useId()

  const [inputValue, setInputValue] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const game = inputValue.trim()
    if (!game) return

    setMessage('')
    searchGame(game)
    setInputValue('')
  }

  function handleInputValue(event) {
    setInputValue(event.target.value)
  }

  function handleResetList() {
    getGames()
    setInputValue('')
  }

  return (
    <>
      {message && <Toast message={message} />}

      <h2>Buscar <span className='primary-color'>Juegos</span></h2>

      <form onSubmit={handleSubmit} id={idForm} method='GET'>
        <div className='inputs_wrapper'>
          <input
            type="text"
            form={idForm}
            name={idInput}
            value={inputValue}
            onChange={handleInputValue}
            autoComplete='off'
            placeholder='Ej: Dark Souls'
            required
          />
        </div>

        <div className='buttons_wrapper'>
          <button type='button' onClick={handleResetList}>Mostrar Todos</button>
          <button type='submit'>Buscar Juego</button>
        </div>
      </form>
    </>
  )
}