
import { v4 as uuid } from 'uuid'

const delay = (amount=758) => new Promise((resolve, reject) => setTimeout(resolve,amount))

export async  function signInRequest(data){
  await delay()

  return{
    token:uuid(),
    user:{
      email:'turaymelo@gmail.com',
      avatar_url:'https://github.com/turaymelo.png'
    }
    
  }
}

export async function recoverUserInformation(){
  await delay()
  ///https://github.com/turaymelo.png
  return{
    user:{
      email:'turaymelo@gmail.com',
      avatar_url:'images/faces/profileIcon.png'
    }
  }
}
