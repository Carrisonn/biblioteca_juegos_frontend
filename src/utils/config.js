export function config(id, data, method) {
  const [game, state] = data

  const API_URL = method === 'POST'
    ? `${import.meta.env.VITE_API_URL}/games`
    : `${import.meta.env.VITE_API_URL}/games/${id}`

  const CONFIG = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game, state })
  }

  return {
    API_URL,
    CONFIG
  }
}