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
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    public db: Firestore,
    public st: AngularFireStorage ){
      
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
    this.authService.SignUp(Useremail,Userpassword, username , bday, name);
    //this.SetUserProfileInfo(username,bday,name);
``  }
    
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
ClickLogin( LgPass : HTMLInputElement, LgUsername :HTMLInputElement){
  this.GetUserProfileInfo(LgUsername.value,LgPass.value);
}

GetUserProfileInfo(userName:string, password:string) {
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
          bio:userData.bio,
          email: userData.email,
          following: userData.following,
          follows:userData.follows,
          TweetIds: userData.TweetIds,
          bookmarks:userData.bookmarks,
          replies: userData.replies
    
        };
        
        this.authService.SignIn(userData.email,password,userName);
        localStorage.setItem('userInfo', JSON.stringify(userInfo)); 
    }
  );
  
  
}






}
