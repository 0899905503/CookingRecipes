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
import { RecipeComponent } from './Shared/Component/recipe/recipe.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'recipe', component: RecipesComponent },
  { path: 'tip', component: TipsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'recipes', component: RecipeComponent },
];

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MenuComponent,
    SelectOptionsComponent,
    RecipeComponent,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [],
})
export class AppRoutingModule {}
