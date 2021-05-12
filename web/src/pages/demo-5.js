import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

const Index = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    dispatch({
      type: 'SET_CONFIG',
      config: {
        layout: 'layout-1',
        collapsed: true,
        rightSidebar: false,
        backdrop: false
      }
    })
    dispatch({
      type: 'SET_PALETTE',
      palette: {
        background: 'light',
        leftSidebar: 'dark',
        navbar: 'light'
      }
    })
    window.scrollTo(0, 0)
    router.push('/')
  }, [dispatch, router])
  return <div />
}
export default Index
