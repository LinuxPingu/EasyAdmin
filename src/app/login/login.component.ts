import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import Swal from 'sweetalert2';
import User from '../interfaces/user.interface';
import { AppInfoService } from "../services/appInfo.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private router:Router, private firebaseService: FirebaseService, private appInfo:AppInfoService) {

   }
   
   @Input() email:string ="";
   @Input() password:string ="";
   user:User ={
    userEmail: "",
    userPassword: "",
    username: "",
    fullName: "",
    isAdmin: false
   };

    async loginUser () {
      console.log(this.email);
      console.log(this.password);

      if(this.email !== "" && this.password !== ""){
       let userPromise:Promise<User> = this.firebaseService.getUserByEmail(this.email);
       await this.setUserData(userPromise);
        if(this.user.userEmail !== ""){
          if(this.user.userPassword === this.password){
            this.appInfo.set_current_user(this.user);
            this.router.navigate(['/landing-page'])
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Wrong password',
            })
          }
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email not found!',
          })
        }

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Not all values are set!',
        })
      }
    }


    async setUserData (promise:Promise<User>){
     await promise.then((data) =>{
        this.user.userID = data.userID,
        this.user.username = data.username,
        this.user.fullName = data.fullName
        this.user.userEmail = data.userEmail
        this.user.userPassword = data.userPassword
        this.user.isAdmin = data.isAdmin;
       });
       
    }

    goRegister(){
    this.router.navigate(['/register'])
    }
}
