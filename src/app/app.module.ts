import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './Page/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // Khai báo LoginComponent ở đây
  ],
  imports: [
    BrowserModule, // Đảm bảo BrowserModule là đầu tiên
    AppRoutingModule,
    RouterModule,
    FormsModule, // Nhập khẩu FormsModule để sử dụng ngModel
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
