import { TipsComponent } from './Page/tips/tips.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Page/login/login.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './Page/homepage/homepage.component';
import { BrowserModule } from '@angular/platform-browser';
import { MenuComponent } from './Shared/menu/menu.component';
import { RecipesComponent } from './Page/recipes/recipes.component';
import { AboutUsComponent } from './Page/about-us/about-us.component';
import { SelectOptionsComponent } from './Shared/Component/select-options/select-options.component';
import { RecipeCardComponent } from './Shared/Component/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { RecipeMainComponent } from './Shared/Component/recipe-main/recipe-main.component';
import { RecipeIngredientComponent } from './Shared/Component/recipe-ingredient/recipe-ingredient.component';
import { RecipeTipComponent } from './Shared/Component/recipe-tip/recipe-tip.component';
import { BottomMenuComponent } from './Shared/bottom-menu/bottom-menu.component';
import { RecipeInstructionComponent } from './Shared/Component/recipe-instruction/recipe-instruction.component';
import { RecipeTitleComponent } from './Shared/Component/recipe-title/recipe-title.component';
import { RecipeTipsComponent } from './Shared/Component/recipe-tips/recipe-tips.component';
import { LoginComponents } from './Shared/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './Shared/register/register.component';
import { AuthComponent } from './Page/auth/auth.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  { path: 'auth', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: AppComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'recipe', component: RecipesComponent },
  { path: 'tip', component: TipsComponent },
  { path: 'about', component: AboutUsComponent },
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MenuComponent,
    SelectOptionsComponent,
    RecipeCardComponent,
    CommonModule,
    RecipeMainComponent,
    RecipeIngredientComponent,
    RecipeTipComponent,
    BottomMenuComponent,
    RecipeInstructionComponent,
    RecipeCardComponent,
    RecipeTitleComponent,
    RecipeTipsComponent,
    LoginComponents,
    RegisterComponent,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [],
})
export class AppRoutingModule {}
