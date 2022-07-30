import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { CheckuserComponent } from './pages/checkuser/checkuser.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { FeedComponent } from './pages/feed/feed.component';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { UserComponent } from './pages/user/user.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full'
},
  {path:'home',component:HomeComponent},
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'user', component: UserComponent },
  { path: 'feed', component: FeedComponent},
  { path: 'explore', component: ExploreComponent},
  
  { path: 'notifications', component: NotificationsComponent},
  {path: 'messages', component: MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
