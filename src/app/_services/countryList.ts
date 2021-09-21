import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase/app'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class countryList {
    countryList: any[] = [

        { "name": "Australia", "code": "AU" },
        { "name": "Austria", "code": "AT" },
        { "name": "Azerbaijan", "code": "AZ" },
        { "name": "Bahamas", "code": "BS" },
        { "name": "Bahrain", "code": "BH" },
        { "name": "Bangladesh", "code": "BD" },
        { "name": "Barbados", "code": "BB" },
        { "name": "Belarus", "code": "BY" },
        { "name": "Germany", "code": "BY" },
        { "name": "Netherlands", "code": "BY" },
        { "name": "Switzerland", "code": "BY" },
        { "name": "Uk", "code": "BY" },
        { "name": "Norway", "code": "BY" },
        { "name": "Italy", "code": "BY" },
        { "name": "Ireland", "code": "BY" },
        { "name": "Denmark", "code": "BY" },
        { "name": "South korea", "code": "BY" },
        { "name": "Belgium", "code": "BY" },
        { "name": "France", "code": "BY" },
        { "name": "Singapore", "code": "BY" },
        { "name": "Sweden", "code": "BY" },
        { "name": "Switzerland", "code": "BY" },
        { "name": "Finland", "code": "BY" },
        { "name": "Spain", "code": "BY" },
        { "name": "Japan", "code": "BY" },
        { "name": "Europe", "code": "BY" },
        { "name": "Austria", "code": "BY" },
        { "name": "USA", "code": "BY" },
        { "name": "Italy", "code": "BY" },
        { "name": "South Korea", "code": "BY" },
        { "name": "Denamrk", "code": "BY" },
        { "name": "Belgium", "code": "BY" },


    ]
    getCountrylist() {
        return this.countryList;
        console.log(this.countryList);

    }
}
