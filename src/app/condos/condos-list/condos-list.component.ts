import { Component, OnInit } from '@angular/core';
import { CondosServiceService } from 'src/app/services/condos.service.service';
import { Condo } from 'src/app/interfaces/condo.interface';
import User from 'src/app/interfaces/user.interface';
import { AppInfoService } from 'src/app/services/appInfo.service';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-condos-list',
  templateUrl: './condos-list.component.html',
  styleUrls: ['./condos-list.component.css']
})
export class CondosListComponent implements OnInit {

  constructor(private condo_service:CondosServiceService, private appInfo:AppInfoService) { }

  public user_condos:Condo[]=[];

  async ngOnInit() {   
    await this.setUserData(this.condo_service.get_user_condos("cgxZMeIanqzCwTkBUasy"))
    await console.log(this.user_condos)
  }

  async setUserData (promise:Promise<Condo[]>){
    await promise.then((data) =>{
      data.forEach(element => {
       this.user_condos.push(element) 
      });
    });
   }
}
