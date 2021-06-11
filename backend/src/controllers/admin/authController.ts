import { Request, Response } from "express";
import userService from "../../services/auth/user";
import token from "../../services/auth/token";
import crypto from "../../services/auth/crypto";
import axios from "axios";
import https from "https"
import fs from "fs"
import qs from 'qs'

const login = async (request: Request, response: Response) => {
  try{ 
    const {
      username,
      password,
    } = request.body;

    console.log({
      username,
      password,
    })

    let caCrt = fs.readFileSync('./secrets/ca.crt')
    
    console.log(caCrt)
    const httpsAgent = new https.Agent({ ca: caCrt, keepAlive: false });
    
    const api = axios.create({
      baseURL: "https://localhost:444/api",
      headers: {
        'content-type': 'application/json'
      },
      withCredentials: true,
      httpsAgent: httpsAgent
    })
    let data = {"User":{
      "login_id": "admin",
      "password": "admin@2021"
    }};

    axios.defaults.headers.post['Content-Type'] = 'application/json';

    // Send a POST request
    await api.post('login')  
    
    
    return response.status(422).json({ msg: "Invalid username or password" });
  }catch(e){
    console.log(e)
    return response.status(500).json({ msg: "Internal server error" , error:e});
  }
  
};

const guest = (request: Request, response: Response) => {
  return response.status(200).json({ msg: "Guest success" });
};

const auth = (request: Request, response: Response) => {
  return response.status(200).json({ msg: "Auth success" });
};

export default {
  login,
  guest,
  auth
}
