import { Request, Response } from "express";
import userService from "../../services/auth/user";
import token from "../../services/auth/token";
import crypto from "../../services/auth/crypto";
import axios, { AxiosRequestConfig } from "axios";
import https from "https"
import fs from "fs"
import qs from 'qs'

const login = async (request: Request, response: Response) => {
  try {
    const {
      username,
      password,
    } = request.body;

    let caCrt = fs.readFileSync('./secrets/ca.crt')

    const httpsAgent = new https.Agent({
      requestCert: true,
      rejectUnauthorized: false,
      ca: caCrt,
      maxVersion: "TLSv1.2",
      minVersion: "TLSv1.2"
    });

    let token = ""

    const options: AxiosRequestConfig = {
      url: `${process.env.Biostar_Host}login`,  // <---this is  a fake ip do not bother
      method: "POST",
      httpsAgent: httpsAgent,
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      data: {
        "User": {
          "login_id": username,
          "password": password
        }
      }
    };

    await axios(options).then((res => {
      console.log(res)
      token = res.headers["bs-session-id"]
      return response.status(200).json({
        token: token,
        user: {
          name :res.data.User.name,
          id:res.data.User.user_id,
          avatar_url:"images/faces/profileIcon.png"
        }
      });
    })).catch((err) => {
      console.log(err);
      return response.status(422).json({ msg: "Invalid username or password" });
    })

    //return response.status(422).json({ msg: "Invalid username or password" });
  } catch (e) {
    console.log(e)
    return response.status(500).json({ msg: "Internal server error", error: e });
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
