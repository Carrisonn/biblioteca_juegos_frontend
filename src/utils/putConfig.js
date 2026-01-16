export function putConfig(id, game, state) {
  const API_URL = `${import.meta.env.VITE_API_URL}/edit`

  const PUT_CONFIG = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, game, state })
  }

  return {
    API_URL,
    PUT_CONFIG
  }
}