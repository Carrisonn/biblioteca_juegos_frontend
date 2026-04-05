import { useId } from 'react'
import { useSearchForm } from '../hooks/useSearchForm.jsx'
import { Toast } from './Toast.jsx'

export function SearchForm() {
  const idForm = useId()
  const idInput = useId()

  const {
    message,
    inputValue,
    handleSubmit,
    handleInputValue,
    handleResetList
  } = useSearchForm()

  return (
    <>
      {message && <Toast message={message} />}

      <h2>Buscar <span className='primary-color'>Juegos</span></h2>

      <form onSubmit={handleSubmit} id={idForm} method='GET'>
        <div className='column'>
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

        <div className='buttons-wrapper'>
          <button type='button' onClick={handleResetList}>Mostrar Todos</button>
          <button type='submit'>Buscar Juego</button>
        </div>
      </form>
    </>
  )
}