import { useScroll } from './hooks/useScroll.jsx'
import { SearchForm } from './components/SearchForm.jsx'
import { ManipulativeForm } from './components/ManipulativeForm.jsx'
import { GameListing } from './components/GameListing.jsx'
import { FloatingButton } from './components/FloatingButton.jsx'

export default function App() {
  const { showButton } = useScroll()

  return (
    <main>
      <h1>Mis <span className="primary-color">Juegos</span></h1>
      <div className='container'>
        <section className='wrapper'>
          <SearchForm />
          <hr />
          <ManipulativeForm />
        </section>

        <section className='wrapper'>
          <GameListing />
        </section>
      </div>

      {showButton && <FloatingButton />}
    </main>
  )
}
