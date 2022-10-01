import { Component, Input, OnInit } from '@angular/core';
import { AppInfoService } from 'src/app/services/appInfo.service';
import User from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.css']
})
export class GlobalNavbarComponent implements OnInit {

  constructor(private appInfo:AppInfoService) { }

   @Input('') curUser : User ={
     userID: '',
     userEmail: '',
     userPassword: '',
     username: '',
     fullName: '',
     isAdmin: false
   };
   
   ngOnInit(): void {
    
  }

}
