import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/tweet';
import {formatDate} from '@angular/common';
import { object } from 'rxfire/database';
import { doc, docData, Firestore, getDoc, waitForPendingWrites } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionService {

  constructor(public afs: AngularFirestore, @Inject(LOCALE_ID) private locale: string,
  public db : Firestore) { }


}
