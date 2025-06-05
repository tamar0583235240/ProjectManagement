import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

const InitialRouter = () => {
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()
  useEffect(() => {
    if (cookies.token) {
      navigate('/app')
    } else {
      navigate('/landingPage')
    }
  }, [cookies.token, navigate])
  return null
}
export default InitialRouter
