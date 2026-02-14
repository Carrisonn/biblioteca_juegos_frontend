import { useId } from 'react'
import { useManipulativeForm } from '../hooks/useManipulativeForm.jsx'
import { Toast } from './Toast.jsx'

export function ManipulativeForm() {
  const idForm = useId()
  const idInput = useId()
  const idSelect = useId()

  const {
    message,
    inputValue,
    selectValue,
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    handleResetForm,
    formTitle,
    buttonText
  } = useManipulativeForm()

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