import {createContext,useState} from 'react'
import {signInRequest} from '../services/auth'
import Router from 'next/router'
import {setCookie} from 'nookies'

export const AuthContext = createContext({})

export function AuthProvider({children}){

  const [user,setUser] = useState()

  const isAuthenticated = !!user;

  async function signIn({email,password}){
    const { token,user } = await signInRequest({
      email,
      password
    })

    setCookie(undefined,'attendance.token',token,{
      maxAge:60 *60*1,// 1 hour
    })

    setUser(user)

    Router.push('/')
  }

  return(
    <AuthContext.Provider value={{isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}
