import { SearchForm } from './components/SearchForm.jsx'
import { ManipulateForm } from './components/ManipulateForm.jsx'
import { GameListing } from './components/GameListing.jsx'

export default function App() {
  return (
    <main>
      <h1>Mis <span className="primary-color">Juegos</span></h1>
      <div className='container'>
        <section className='wrapper'>
          <SearchForm />
          <hr />
          <ManipulateForm />
        </section>

        <section className='wrapper'>
          <GameListing />
        </section>
      </div>
    </main>
  )
}
