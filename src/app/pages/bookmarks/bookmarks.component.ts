import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { TweetService } from 'src/app/shared/tweetService/tweet.service';
import { UserInteractionService } from 'src/app/shared/UserInteractions/user-interaction.service';
import { Router } from '@angular/router';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { NotifyService } from 'src/app/shared/services/notify.service';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  userProfileURL = this.userInfo.userProfileURL;
  feedTweets: any;

  constructor(public authservice : AuthService,
    public storage: AngularFireStorage,
    public TweetService: TweetService,
    public userInter: UserInteractionService,
    public router: Router,
    public NotifService: NotifyService) { 
    const notifications: any = NotifService.getUserNotif();
    this.feedTweets = TweetService.getBookmarks();
  }
  goToPage(username:string){
    this.userInter.goToPage(username).then(()=>{
      this.router.navigate(['other']);
    })
  }
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
  faTrash = faTrash;
  faExclamation  = faExclamation;
}
