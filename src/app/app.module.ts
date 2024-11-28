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
import { RecipeCardComponent } from './Shared/Component/recipe-card/recipe-card.component';
import { RecipesComponent } from './Page/recipes/recipes.component';
import { RecipeMainComponent } from './Shared/Component/recipe-main/recipe-main.component';
import { RecipeIngredientComponent } from './Shared/Component/recipe-ingredient/recipe-ingredient.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectOptionsComponent,
    RecipeCardComponent,
    RecipesComponent,
    RecipeMainComponent,
    RecipeIngredientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RecipeMainComponent,
  ],
  exports: [RecipeMainComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
