import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckuserComponent } from './pages/checkuser/checkuser.component';
import { HomeComponent } from './pages/home/home.component';
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
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
