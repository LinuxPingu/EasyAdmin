import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import User from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  addNewUser(user:User){
    const userRef = collection(this.firestore,'users');
    return addDoc(userRef,user);
  }

  getUsers():Observable<User[]>{
    const userRef = collection(this.firestore,'users');
    return collectionData(userRef,{idField:'userID'}) as Observable<User[]>;
  }
}
