import { useId, useState } from 'react'
import { useGameStore } from '../store/gameStore.js'

export function SearchForm() {
  const { getGames, searchGame, searchFormMessage, typeMessage } = useGameStore()

  const [inputValue, setInputValue] = useState('')

  const idForm = useId()
  const idInput = useId()

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
        searchFormMessage && <p className={`feedback_message ${typeMessage}`}>{searchFormMessage}</p>
      }
    </>
  )
}