import { Route } from './components/Route.jsx'
import { Home } from './components/Home.jsx'
import { APIHealthCheck } from './components/APIHealthCheck.jsx'

export default function App() {
  return (
    <>
      <Route path='/' component={Home} />
      <Route path='/health' component={APIHealthCheck} />
    </>
  )
}
