import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    ref = firebase.firestore().collection('users');
    private mentorsCollection: any;
    constructor(
        private firestore: AngularFirestore,
        public afs: AngularFirestore,
        // private httpService: HttpClient,
    ) {
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

    addUserForum(data: any) {
        data.timeStamp = moment().format('x')
        return firebase.firestore().collection('userForums').add(data);
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
                    let res = { ...doc.data() as {}, id: doc.id }
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

}
