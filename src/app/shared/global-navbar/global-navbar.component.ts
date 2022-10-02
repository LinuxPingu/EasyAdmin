import { Component, Input, OnInit } from '@angular/core';
import { AppInfoService } from 'src/app/services/appInfo.service';
import User from 'src/app/interfaces/user.interface';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.css']
})
export class GlobalNavbarComponent implements OnInit {

  constructor(private appInfo:AppInfoService, private userService:FirebaseService) { }

   @Input('') curUser : User ={
     userID: '',
     userEmail: '',
     userPassword: '',
     username: '',
     fullName: '',
     isAdmin: false
   };
   
   ngOnInit(): void {
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
