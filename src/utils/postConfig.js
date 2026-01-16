export function postConfig(game, state) {
  const API_URL = `${import.meta.env.VITE_API_URL}/create`

  const POST_CONFIG = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game, state })
  }

  return {
    API_URL,
    POST_CONFIG
  }
}