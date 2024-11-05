import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Page/login/login.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './Page/homepage/homepage.component';
import { BrowserModule } from '@angular/platform-browser';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent },
  { path: 'home', component: HomepageComponent },
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule],
  providers: [],
  bootstrap: [],
})
export class AppRoutingModule {}
