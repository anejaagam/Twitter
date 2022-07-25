import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { AngularFireStorage, AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask, GetDownloadURLPipe } from '@angular/fire/compat/storage'
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

                   


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  constructor(public authservice : AuthService,
    public storage :AngularFireStorage
    ) { 
      const ref = this.storage.ref(this.userInfo.photoURL);
      this.pfp = ref.getDownloadURL();
      console.log(this.userInfo.photoURL);

     // const pfpref = ref(StorageRef, 'default/Default_pfp.jpeg')
      //getDownloadURL(pfpref)
  //.then((url) => {
    // Insert url into an <img> tag to "download"
    //this.pfpUrl = url;
    //this.userInfo.profileURL = url;
    

  }
  //ref:AngularFireStorageReference;
  task:AngularFireUploadTask;
  
  
  ngOnInit(): void {
  }
  faBell = faBell;
  faTwitter = faTwitter;
  faHome = faHome;
  faSearch = faSearch;
  faEnvelope = faEnvelope;
  faBookmark = faBookmark;
  faUser = faUser;
  faComment = faComment;
  faHeart = faHeart;
  faUpload = faUpload;
  faRetweet = faRetweet;
  userProfileURL = this.userInfo.userProfileURL;
}
