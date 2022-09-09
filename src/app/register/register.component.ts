import { Component, Input, OnInit } from '@angular/core';
import User from '../interfaces/user.interface';
import { FirebaseService } from '../services/firebase.service';

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

  buildNewUser =() =>{
    this.newUser.username = this.fullName;
    this.newUser.username = this.userName;
    this.newUser.userEmail = this.email;
    this.newUser.userPassword = this.passWord;
  }
  
  addNewUser=() => { 
    this.buildNewUser();
    this.fireBaseService.addNewUser(this.newUser);
  }

}
