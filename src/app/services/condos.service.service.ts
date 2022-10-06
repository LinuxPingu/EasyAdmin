import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs, doc, getDoc, deleteDoc  } from "firebase/firestore";
import { object } from 'rxfire/database';
import { map, Observable } from 'rxjs';
import { Condo } from '../interfaces/condo.interface';
import User from '../interfaces/user.interface';
import { convertSnaps } from './db-utils';
import { ServiceInterface } from '../interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class CondosServiceService {

  constructor(private firestore: Firestore, private angularFs:AngularFirestore) { }

  addNewCondo(newCondo:Condo){
    const condoRef = collection(this.firestore,'condos');
    return addDoc(condoRef,newCondo);
  }

  getCondos():Observable<Condo[]>{
    const condoRef = collection(this.firestore,'condos');
    return collectionData(condoRef) as Observable<Condo[]>
  }

  async get_user_condos(owner:string):Promise<Condo[]>{
    let condos:Condo[] = []
    const q = query(collection(this.firestore,'condos'),where('owner_id','==',owner))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     
      let found:Condo ={
        email: doc.get('email'),
        isActive: doc.get('isActive'),
        location: doc.get('location'),
        name:  doc.get('name'),
        owner_id: doc.get('owner_id'),
        phone: doc.get('phone'),
        id: doc.id.toString()
      }
      condos.push(found)
    });
    return condos
  }
  
    refreshList = new Observable<Condo[]>((observer) =>{
     let condos:Condo[] = []
     let uid = localStorage.getItem('current-user')
     if(uid != null){
      let promise:Promise<Condo[]> = this.get_user_condos(uid); 
     }
   })


   delete_Condo(id:string){
      const condoDocRef = doc(this.firestore,`condos/${id}`)
      return deleteDoc(condoDocRef);
   }

   findAll(owner:string): Observable<Condo[]>{
    return this.angularFs.collection('condos', ref => ref.where('owner_id','==',owner)).get().pipe(map(result =>convertSnaps<Condo>(result)));
   }
}
