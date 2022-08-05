import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { UserInfo } from '../../user-info';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  get currentUserProfile$(): Observable<UserInfo | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<UserInfo>;
      })
    );
  }

  get allUsers$(): Observable<UserInfo[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<UserInfo[]>;
  }

  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService
  ) {}

  addUser(user: UserInfo): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.username);
    return from(setDoc(ref, user));
  }

  updateUser(user: UserInfo): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.username);
    return from(updateDoc(ref, { ...user }));
  }
}
