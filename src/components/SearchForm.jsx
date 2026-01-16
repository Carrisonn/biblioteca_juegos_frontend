import { useId, useState } from 'react'
import { useGameStore } from '../store/gameStore.js'
import { Toast } from './Toast.jsx'

export function SearchForm() {
  const getGames = useGameStore(state => state.getGames)
  const searchGame = useGameStore(state => state.searchGame)
  const message = useGameStore(state => state.message)

  const idForm = useId()
  const idInput = useId()

  const [inputValue, setInputValue] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const gameSearched = formData.get(idInput).trim()
    if (!gameSearched) return

    searchGame(gameSearched)
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

      {
        message && <Toast message={message} />
      }
    </>
  )
}