import { Component, OnInit } from '@angular/core';
import { CondosServiceService } from 'src/app/services/condos.service.service';
import { Condo } from 'src/app/interfaces/condo.interface';
import User from 'src/app/interfaces/user.interface';
import { AppInfoService } from 'src/app/services/appInfo.service';
import { ThisReceiver } from '@angular/compiler';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-condos-list',
  templateUrl: './condos-list.component.html',
  styleUrls: ['./condos-list.component.css']
})
export class CondosListComponent implements OnInit {

  constructor(private condo_service:CondosServiceService, private appInfo:AppInfoService) { }

  public user_condos:Condo[]=[];

  public sub = interval(3000).subscribe(x =>{
    let uid = localStorage.getItem('current-user')
    if(uid != null){
     this.condo_service.findAll(uid).subscribe((val) => { console.log(val); this.user_condos = val})
    }
  });

  async ngOnInit() { 
    let uid = localStorage.getItem('current-user')
    if(uid != null){
      await this.setUserData(this.condo_service.get_user_condos(uid))
      await console.log(this.user_condos)
    }  
  }
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async setUserData (promise:Promise<Condo[]>){
    await promise.then((data) =>{
      data.forEach(element => {
       this.user_condos.push(element) 
      });
    });
   }
}
