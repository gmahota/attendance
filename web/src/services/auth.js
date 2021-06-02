
import { v4 as uuid } from 'uuid'

const delay = (amount=758) => new Promise((resolve, reject) => setTimeout(resolve,amount))

export async  function signInRequest(data){
  await delay()

  return{
    token:uuid(),
    user:{
      email:'guimaraesmahota@gmail.com',
      avatar_url:'https://github.com/gmahota.png'
    }
    
  }
}

export async function recoverUserInformation(){
  await delay()
  return{
    user:{
      email:'guimaraesmahota@gmail.com',
      avatar_url:'https://github.com/gmahota.png'
    }
  }
}
