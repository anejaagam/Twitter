import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from "./shared/services/auth.service";
import { UserComponent } from './pages/user/user.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { CheckuserComponent } from './pages/checkuser/checkuser.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GetDownloadURLPipe } from '@angular/fire/compat/storage';
import { FeedComponent } from './pages/feed/feed.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { OthersComponent } from './pages/others/others.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { MatMenuModule } from '@angular/material/menu';

import { MatListModule } from '@angular/material/list';
import {} from '@angular/material/form-field';
import {} from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { DateDisplayPipe } from './shared/pipes/date-display.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    VerifyEmailComponent,
    CheckuserComponent,
    FeedComponent,
    ExploreComponent,
    NotificationsComponent,
    BookmarksComponent,
    MessagesComponent,
    OthersComponent,
    DateDisplayPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    FontAwesomeModule,
    HotToastModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDividerModule,
  ],
  providers: [
    ScreenTrackingService,UserTrackingService, AuthService,
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
