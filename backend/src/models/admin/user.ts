import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"

export default class User {   

  id: string;

  username: string;
  
  name: string;
  
  firstName?: string;
  
  lastName?: string;
  
  email?: string;

  phoneNumber?: string;
  
  password: string;
  
  confirmPassword: boolean;
  
  inactive: boolean;
  
  country: string;

  constructor(){
    this.firstName= ""
    this.firstName= "",
    this.email= "",
    this.phoneNumber= "",
    this.confirmPassword= false,
    this.country="Moz"
  } 
}

export {
  //UserSchema,
  User,
};
