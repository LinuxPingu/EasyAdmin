import { Component, Input, OnInit } from '@angular/core';
import User from '../interfaces/user.interface';
import { LandingUserService } from '../services/landing-user.service';
@Component({
  selector: 'app-landing-user',
  templateUrl: './landing-user.component.html',
  styleUrls: ['./landing-user.component.css']
})
export class LandingUserComponent implements OnInit {

  constructor(private landing:LandingUserService) { }
  isFound:boolean =false;

  @Input('') curUser : User ={
    userID: '',
    userEmail: '',
    userPassword: '',
    username: '',
    fullName: '',
    isAdmin: false
  };
  
  ngOnInit(): void {
    let uid = localStorage.getItem('current-user')
    if(uid != null){
    this.isFound = this.landing.user_is_found(uid);
    }
  }

}
