import { useStore } from '../store/store.js'

export function useMessageHandler() {
  const setMessage = useStore(state => state.setMessage)

  const messageHandler = ({ message, statusCode }) => {
    if (statusCode === 500) return setMessage('En estos momentos el servicio no esta disponible, vuelve más tarde')

    setMessage(message)
  }

  return { messageHandler }
}