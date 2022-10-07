import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsInterface } from '../interfaces/requests.interface';
import User from '../interfaces/user.interface';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit  {

  constructor(private userService:FirebaseService) { }
  @Input('') curUser : User ={
    userID: '',
    userEmail: '',
    userPassword: '',
    username: '',
    fullName: '',
    isAdmin: false
  };
  
  ngOnInit() {
    let curUser = history.state.data;
    console.log(localStorage.getItem('current-user'))
    let email = localStorage.getItem('current-user-mail');
    if(email != null){
      this.setUserData(this.userService.getUserByEmail(email));
    }
  }

  async setUserData (promise:Promise<User>){
    await promise.then((data) =>{
       this.curUser.userID = data.userID,
       this.curUser.username = data.username,
       this.curUser.fullName = data.fullName
       this.curUser.userEmail = data.userEmail
       this.curUser.userPassword = data.userPassword
       this.curUser.isAdmin = data.isAdmin;
      });  
   }
}
