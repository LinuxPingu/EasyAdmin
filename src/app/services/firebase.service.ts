import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';
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

}
