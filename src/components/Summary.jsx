import { APIHealthCheck } from './APIHealthCheck.jsx'
import { Stats } from './Stats.jsx'

export function Summary() {
  return (
    <>
      <h2>Resumen</h2>
      <Stats />
      <APIHealthCheck />
    </>
  )
}