import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  ref = firebase.firestore().collection('users');
  private mentorsCollection: any;
  private ticketCollections: any;

  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore,
    // private httpService: HttpClient,
  )
  {
    this.mentorsCollection = this.afs.collection<any>('mentors', ref => ref.orderBy('created_on'));
    this.ticketCollections = this.afs.collection<any>('purchasedTickets', ref => ref.orderBy('created_on'));
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

  addPurchase(data: any) {
    return this.ticketCollections.add(data);
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
      this.firestore.collection('meetups',
        ref => ref.where('mentorId', '==', (mentorId))).snapshotChanges()
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
  getAllTestiMonial() {
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

getAllStudies() {
  return new Promise((resolve) => {
    this.firestore.collection('studies').snapshotChanges()
      .subscribe(studies => {
        let contactList = studies.map(item => {
          return {
            ...item.payload.doc.data() as {},
            id: item.payload.doc.id
          };
        });
        resolve(contactList);
      })
  })
}

getAllLanguage() {
  return new Promise((resolve) => {
    this.firestore.collection('language').snapshotChanges()
      .subscribe(language => {
        let contactList = language.map(item => {
          return {
            ...item.payload.doc.data() as {},
            id: item.payload.doc.id
          };
        });
        resolve(contactList);
      })
  })
}

getReviewsById(id: any) {
    return new Promise((resolve) => {
      var docRef = this.firestore.collection("reviews").doc(id);

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

  getReviewsBId(mentorId: any) {
    return new Promise((resolve) => {
      this.firestore.collection('reviews',
        ref => ref.where('mentorId', '==', (mentorId))).snapshotChanges()
        .subscribe(reviews => {
          let contactList = reviews.map(item => {
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
