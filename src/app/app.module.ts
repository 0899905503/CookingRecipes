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
import { RecipeTipComponent } from './Shared/Component/recipe-tip/recipe-tip.component';
import { BottomMenuComponent } from './Shared/bottom-menu/bottom-menu.component';
import { MenuComponent } from './Shared/menu/menu.component';
import { RecipeInstructionComponent } from './Shared/Component/recipe-instruction/recipe-instruction.component';
import { RecipeTitleComponent } from './Shared/Component/recipe-title/recipe-title.component';
import { RecipeTipsComponent } from './Shared/Component/recipe-tips/recipe-tips.component';
import { LoginComponents } from './Shared/login/login.component';
import { RegisterComponent } from './Shared/register/register.component';
import { AuthComponent } from './Page/auth/auth.component';
import { NotFoundPageComponent } from './Shared/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectOptionsComponent,
    RecipesComponent,
    RecipeMainComponent,
    RecipeIngredientComponent,
    RecipeTipComponent,
    BottomMenuComponent,
    MenuComponent,
    RecipeCardComponent,
    RecipeInstructionComponent,
    RecipeTitleComponent,
    RecipeTipsComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    NgModule,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RecipeMainComponent,
    RecipeTipComponent,
    RecipeIngredientComponent,
    BottomMenuComponent,
    MenuComponent,
    RecipeInstructionComponent,
    RecipeCardComponent,
    RecipeTitleComponent,
    RecipeTipsComponent,
    LoginComponents,
    RegisterComponent,
    AuthComponent,
    NgModule,
    NotFoundPageComponent,
  ],
  exports: [RecipeMainComponent, RegisterComponent, AuthComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
