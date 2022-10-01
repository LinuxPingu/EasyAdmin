import { Injectable } from '@angular/core';
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  constructor() { }

   private current_user:User ={
    userEmail: "",
    userPassword: "",
    username: "",
    fullName: "",
    isAdmin: false
   };

   public set_current_user(user:User){
    this.current_user = user;
   }

   public get_current_user =():User =>{
    return this.current_user
   }

}
