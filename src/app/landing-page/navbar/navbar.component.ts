import { Component, OnInit } from '@angular/core';
import { AppInfoService } from 'src/app/services/appInfo.service';
import User from 'src/app/interfaces/user.interface';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private appInfo:AppInfoService) { }

    current_user:User ={
    userEmail: "",
    userPassword: "",
    username: "",
    fullName: "",
    isAdmin: false
   };

   ngOnInit(): void {
    this.current_user = this.appInfo.get_current_user();
   }

}
