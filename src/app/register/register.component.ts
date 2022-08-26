import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor() { }

  fullNameHint:string = "ex: Daniel Hernandez Sanchez";
  emailHint:string="ex yourmail@gmail.com"
  userNameHint:string =" ex: Username0599 ";
  passWordHint:string =" ex: pass123 ";

  @Input() fullName:string = "";
  @Input() userName:string ="";
  @Input() email:string=""
  @Input() passWord:string ="";
  
  addNewUser=() => {
    console.log(this.fullName)
    console.log(this.userName)
    console.log(this.email)
    console.log(this.passWord)
  }

}
