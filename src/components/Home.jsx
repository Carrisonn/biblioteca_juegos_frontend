import { useScroll } from '../hooks/useScroll.jsx'
import { SearchForm } from './SearchForm.jsx'
import { ManipulativeForm } from './ManipulativeForm.jsx'
import { GameListing } from './GameListing.jsx'
import { FloatingButton } from './FloatingButton.jsx'

export function Home() {
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