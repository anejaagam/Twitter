import { Injectable, NgZone } from '@angular/core';
import { UserData } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { UserComponent } from 'src/app/pages/user/user.component';
import { UserInfo } from 'src/app/user-info';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        localStorage.setItem('userInfo', 'null');
        JSON.parse(localStorage.getItem('user')!);
        JSON.parse(localStorage.getItem('userInfo')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string, username:string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['user']);
        });
       
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string, username:string, bday: string, name:string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        
        this.SendVerificationMail();
        this.SetUserData1(result.user, username, bday, name);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  
 
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  
  SetUserData1(user: any, userName:string, userBday?:string, name?:string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userRef2: AngularFirestoreDocument<any> = this.afs.doc(
      `userInfo/${userName}`
    );
   
    const userInfo: UserInfo = {
      name:name,
      username: userName,
      verified: false,
      bday: userBday,
      photoURL: 'default/Default_pfp.jpeg',
      coverPhotoUrl: 'default/Default_pfp.jpeg',
      followers: 0,
      followed: 0,
      NumberOfTweets: 0,
      bio: "Hi I just joined Twitter!",
      email: user.email,
      following: [],
      follows: [],
      TweetIds: [],
      bookmarks:[],
      replies: []
    };
    
    
    const userData: UserData = {
      uid: user.uid,
      email: user.email,
      username: userName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    userRef.set(userData, {
      merge: true,
    }).then(()=>{
      userRef2.set(userInfo, {
        merge: true,
      }).then(()=>{getDownloadURL(ref(getStorage(),userInfo.photoURL)).then((url)=>{
        userInfo.photoURL = url;
        userRef2.update({photoURL: url}).then(()=>{getDownloadURL(ref(getStorage(),userInfo.coverPhotoUrl)).then((url)=>{
          userInfo.coverPhotoUrl = url;
          userRef2.update({coverPhotoUrl: url}).then(()=>{localStorage.setItem('userInfo', JSON.stringify(userInfo));});
        })});
      })})
    })
    
  }

  


  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo')
      this.router.navigate(['home']);
    });
  }
}