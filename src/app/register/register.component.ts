import { Component, Input, OnInit } from '@angular/core';
import User from '../interfaces/user.interface';
import { FirebaseService } from '../services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(private fireBaseService:FirebaseService) { 
  
  }

  @Input() fullName:string = "";
  @Input() userName:string ="";
  @Input() email:string=""
  @Input() passWord:string ="";

  newUser:User ={
    userEmail: "",
    userPassword: "",
    username: "",
    fullName: ""
  };

  fullNameHint:string = "ex: Daniel Hernandez Sanchez";
  emailHint:string="ex yourmail@gmail.com"
  userNameHint:string =" ex: Username0599 ";
  passWordHint:string =" ex: pass123 ";

  buildNewUser =():boolean =>{
    
   let allSet:boolean = false;

    if(this.fullName !== "" && this.userName !== "" && this.userName !== "" && this.email !== ""){
      this.newUser.username = this.fullName;
      this.newUser.username = this.userName;
      this.newUser.userEmail = this.email;
      this.newUser.userPassword = this.passWord;
      allSet = true;
    }

    return allSet;
  }
  
  addNewUser=() => { 
    let allSet:boolean = this.buildNewUser();

    if(allSet){
      try {
        this.fireBaseService.addNewUser(this.newUser);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `User ${this.userName} created! `,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
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

}
