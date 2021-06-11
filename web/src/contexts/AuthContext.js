import {createContext,useState,useEffect} from 'react'
import {setCookie, parseCookies} from 'nookies'
import {signInRequest,recoverUserInformation} from '../services/auth'
import Router from 'next/router'
import { api } from '../services/api'


export const AuthContext = createContext({})

export function AuthProvider({children}){

  const [user,setUser] = useState(null)

  const isAuthenticated = !!user;

  useEffect(() => {
    const {['attendance.token']: token} = parseCookies()

    if(token){
      recoverUserInformation().then(response=> {
        setUser(response.user)
      })
    }
  },[])

  async function signIn({userName,password}){
    const { token,user } = await signInRequest({
      userName,
      password
    })

    setCookie(undefined,'attendance.token',token,{
      maxAge:60*60*14,// 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user)

    Router.push('/')
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
