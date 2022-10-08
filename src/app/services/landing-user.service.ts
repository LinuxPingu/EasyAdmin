import { Injectable } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import User from '../interfaces/user.interface';
import { RequestsInterface } from '../interfaces/requests.interface';
import { interval } from 'rxjs';
import { Firestore, addDoc, collectionData} from '@angular/fire/firestore';
import { collection, query, where, getDocs, doc, getDoc, QuerySnapshot  } from "firebase/firestore";
import { object } from 'rxfire/database';
import { Observable, of } from 'rxjs';
import { Condo } from '../interfaces/condo.interface';
import { CondosServiceService } from 'src/app/services/condos.service.service';
import { RequestsCondoItemInterface } from '../interfaces/requests-condo-item.interface';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { compileDeclareClassMetadata } from '@angular/compiler';
import { RequestsService } from './requests.service';
import { HabitantsInterface } from '../interfaces/habitants.interface';
@Injectable({
  providedIn: 'root'
})
export class LandingUserService {

  constructor(private firestore:Firestore, private request_service:RequestsService) { }


  async get_all_habitants():Promise<HabitantsInterface[]>{

    let habitants:HabitantsInterface[] = []
    const userRef = collection(this.firestore,'users');
    const q = query(userRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let habitant:HabitantsInterface ={
        id: doc.id.toString(),
        condo_id:doc.get('condo_id'),
        user_id:doc.get('user_id'),
        locator:doc.get('locator')
      }
      habitants.push(habitant)  
    });
   return habitants;
  }

   user_is_found(uid:string):boolean{
    let p:Promise<HabitantsInterface[]> = this.get_all_habitants() 
    let a:HabitantsInterface[] = []
    let isTrue:boolean = false
    p.then(x => { a = x})
    if(a.some(element => element.user_id === uid)){
      isTrue = true;
    }
    return isTrue
   }

}
