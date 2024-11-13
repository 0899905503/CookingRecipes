import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './Page/login/login.component';
import { CommonModule } from '@angular/common';
import { SelectOptionsComponent } from './Shared/Component/select-options/select-options.component';
import { RecipeComponent } from './Shared/Component/recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectOptionsComponent,
    RecipeComponent,
  ],
  imports: [
    BrowserModule, // Đảm bảo BrowserModule là đầu tiên
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule, // Nhập khẩu FormsModule để sử dụng ngModel
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
