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
import { NotifyService } from 'src/app/shared/services/notify.service';
import { DateDisplayPipe } from 'src/app/shared/pipes/date-display.pipe';
import { UserInteractionService } from 'src/app/shared/UserInteractions/user-interaction.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  userInfo = JSON.parse(localStorage.getItem('userInfo')|| '{}');
  pfp: Observable<string | null>;
  userProfileURL = this.userInfo.userProfileURL;
  feedTweets: any;
  userInter: UserInteractionService;
  router: Router;

  constructor(public authservice : AuthService,
    public storage: AngularFireStorage,
    public TweetService: TweetService,
    public NotifService: NotifyService) { 
   
    this.feedTweets = NotifService.getUserNotif();
  }
  goToPage(username:string){
    console.log(username)
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
  
}
