import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  ref = firebase.firestore().collection('users');
  private mentorsCollection: any;
  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore,
    // private httpService: HttpClient,
    private storage: AngularFireStorage
  )
  {
    this.mentorsCollection = this.afs.collection<any>('mentors', ref => ref.orderBy('created_on'));
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

  getAllMentors() {
    return new Promise((resolve) => {
      this.firestore.collection('mentors').snapshotChanges()
        .subscribe(mentors => {
          let contactList = mentors.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }

getMentorsById(id: any) {
    return new Promise((resolve) => {
      var docRef = this.firestore.collection("mentors").doc(id);

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

  getMentorsBId(mentorId: any) {
    return new Promise((resolve) => {
      this.firestore.collection('mentors',
        ref => ref.where('mentorId', '==', parseInt(mentorId))).snapshotChanges()
        .subscribe(mentors => {
          let contactList = mentors.map(item => {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc.id
            };
          });
          resolve(contactList);
        })
    })
  }
  etAllTestiMonial() {
  return new Promise((resolve) => {
    this.firestore.collection('testimonial').snapshotChanges()
      .subscribe(testimonial => {
        let contactList = testimonial.map(item => {
          return {
            ...item.payload.doc.data() as {},
            id: item.payload.doc.id
          };
        });
        resolve(contactList);
      })
  })
}
getTestiMonialById(id: any) {
  return new Promise((resolve) => {
    var docRef = this.firestore.collection("testimonial").doc(id);

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

getTestiMonialBId(testimonialId: any) {
  return new Promise((resolve) => {
    this.firestore.collection('testimonial',
      ref => ref.where('testimonialId', '==', parseInt(testimonialId))).snapshotChanges()
      .subscribe(testimonial => {
        let contactList = testimonial.map(item => {
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