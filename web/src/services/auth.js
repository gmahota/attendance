import getConfig from "next/config";
import { v4 as uuid } from "uuid";
import axios from "axios";

const delay = (amount = 758) =>
  new Promise((resolve, reject) => setTimeout(resolve, amount));

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export async function signInRequest(data) {
  data = { User:{
    login_id: data.userName,
    password: data.password
  }};

  return {
    token: uuid(),
    user: {
      email: "turaymelo@gmail.com",
      avatar_url: "images/faces/profileIcon.png",
    },
  };
}

export async function recoverUserInformation() {
  await delay();
  ///https://github.com/turaymelo.png
  return {
    user: {
      email: "turaymelo@gmail.com",
      avatar_url: "images/faces/profileIcon.png",
    },
  };
}
