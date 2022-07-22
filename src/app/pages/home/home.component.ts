import { Component, getDebugNode, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/services/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { UserInfo } from 'src/app/user-info';
import { getDoc, Firestore, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './stylesheet.css']
})



export class HomeComponent implements OnInit {
  userinfodata: UserInfo;
  constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public db: Firestore) {
      
   }
   

  ngOnInit(): void {
  }

  onRegClick(regUsername: HTMLInputElement,regEmail: HTMLInputElement,regName: HTMLInputElement,regPass: HTMLInputElement,regBday: HTMLInputElement){
    let Useremail = regEmail.value;
    let username = regUsername.value;
    let Userpassword = regPass.value;
    let name = regName.value;
    let bday = regBday.value;
    let loginData = {Useremail,Userpassword};
    this.authService.SignUp(Useremail,Userpassword, username , bday);
    this.SetUserProfileInfo(username,bday,name);
  }
    
    //signInWithEmailAndPassword(auth, email, password)
  //.then((userCredential) => {
    // Signed in 
    //const user = userCredential.user;
    
    // ...
  //})
  //.catch((error) => {
   // const errorCode = error.code;
  //  const errorMessage = error.message;
  //});
ClickLogin(LgEmail :HTMLInputElement, LgPass : HTMLInputElement, LgUsername :HTMLInputElement){
  this.GetUserProfileInfo(LgUsername.value, LgEmail.value,LgPass.value);
}

GetUserProfileInfo(userName:string, email: string, password:string) {
  let userData :any;
  const userRef = doc(this.db,'userInfo', userName);
  const userSnap = getDoc(userRef).then(
    (e)=>{
        userData = e.data();

        const userInfo: UserInfo = {
          name: userData.name,
          username: userData.username,
          verified: userData.verified,
          bday: userData.bday,
          photoURL: userData.photoURL,
          coverPhotoUrl: userData.coverPhotoUrl,
          followers: userData.followers,
          followed: userData.followed,
          NumberOfTweets: userData.NumberOfTweets,
          bio:userData.bio
    
        };
        
        this.authService.SignIn(email,password,userName);
        localStorage.setItem('userInfo', JSON.stringify(userInfo)); 
    }
  );
  
  
}

SetUserProfileInfo(userName:string, userBday:string, name:string) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    `userInfo/${userName}`
  );
  const userInfo: UserInfo = {
    name:name,
    username: userName,
    verified: false,
    bday: userBday,
    photoURL: "gs://cosc310twitter.appspot.com/blank-profile-picture-973460_960_720.webp",
    coverPhotoUrl: "gs://cosc310twitter.appspot.com/blank-profile-picture-973460_960_720.webp",
    followers: 0,
    followed: 0,
    NumberOfTweets: 0,
    bio: "Hi I just joined Twitter!"
  };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  return userRef.set(userInfo, {
    merge: true,
  });

  
}






}
