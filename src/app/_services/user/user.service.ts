import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase/app'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ref = firebase.firestore().collection('users');
  private roleCollection: any;
  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.roleCollection = this.afs.collection<any>('rolemanagement', ref => ref.orderBy('roleName'));
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        localStorage.removeItem('currentUser');
        this.afAuth.auth.signOut();
        resolve(true);
      } else {
        localStorage.removeItem('currentUser');
        reject(false);
      }
    });
  }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  updateUser(uid: string, user: any) {
    return this.afs.doc('users/' + uid).set(user);
  }


  getCurrentUser(userId): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('uid', '==', userId)).snapshotChanges();
  }

  createUser(user) {
    return this.ref.add(user);
  }

  getUserProfileById(uid: any) {
    return new Promise((resolve) => {
      this.firestore.collection('users',
        ref => ref.where('uid', '==', uid)).snapshotChanges()
        .subscribe(users => {
          let contactList = users.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }
}
