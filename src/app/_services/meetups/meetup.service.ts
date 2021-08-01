import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class MeetupService {

  ref = firebase.firestore().collection('users');
  private mentorsCollection: any;
  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore,
    // private httpService: HttpClient,
  )
  {
    this.mentorsCollection = this.afs.collection<any>('meetups', ref => ref.orderBy('created_on'));
  }

  generateUniqNumber(length?: any) {
    var length = length || 8,
      charset = "0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  getAllMeetups() {
    return new Promise((resolve) => {
      this.firestore.collection('meetups').snapshotChanges()
        .subscribe(meetups => {
          let contactList = meetups.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }

getMeetupById(id: any) {
    return new Promise((resolve) => {
      var docRef = this.firestore.collection("meetups").doc(id);

      docRef.ref.get().then(function(doc) {
        if (doc.exists) {
          let res = { ...doc.data()  as {} , id: doc.id }
          resolve(res)
        }
      }).catch(function(error) {
        resolve(null);
      });
    })
  }

  getMeetupsBId(meetupsId: any) {
    return new Promise((resolve) => {
      this.firestore.collection('meetups',
        ref => ref.where('meetupsId', '==', parseInt(meetupsId))).snapshotChanges()
        .subscribe(meetups => {
          let contactList = meetups.map(item => {
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
