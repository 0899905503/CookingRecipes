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
import { RegisterComponent } from './Shared/register/register.component';
import { AuthComponent } from './Page/auth/auth.component';
import { NotFoundPageComponent } from './Shared/not-found-page/not-found-page.component';
import { CookingTipComponent } from './Shared/Component/cooking-tip/cooking-tip.component';
import { CookingTipDetailComponent } from './Page/cooking-tip-detail/cooking-tip-detail.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './Service/Auth/Login/login.service';
import { CreateRecipeComponent } from './Page/create-recipe/create-recipe.component';
import { CreateNutrientComponent } from './Shared/Component/CreateRecipes/create-nutrient/create-nutrient.component';
import { SettingpageComponent } from './Page/settingpage/settingpage.component';
import { FavoriteComponent } from './Page/favorite/favorite.component';
import { CommentComponent } from './Shared/Component/comment/comment.component';
import { AdminPageComponent } from './Page/admin-page/admin-page.component';
import { UpdateRecipeComponent } from './Page/update-recipe/update-recipe.component';
import { CreateCookingTipComponent } from './Page/create-cooking-tip/create-cooking-tip.component';
import { RankingComponent } from './Page/ranking/ranking.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  { path: 'recipes/:recipeId', component: RecipesComponent },
  { path: 'cookingtip/:cookingTipId', component: CookingTipComponent },
  { path: 'cookingTip/:cookingTipId', component: CookingTipDetailComponent },
  { path: 'createCookingTip', component: CreateCookingTipComponent },
  { path: 'createRecipes', component: CreateRecipeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: AppComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'recipe', component: RecipesComponent, canActivate: [AuthGuard] },
  {
    path: 'updateRecipe/:recipeId',
    component: UpdateRecipeComponent,
    canActivate: [AuthGuard],
  },

  { path: 'tip', component: TipsComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutUsComponent, canActivate: [AuthGuard] },
  {
    path: 'setting',
    component: SettingpageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },

  { path: 'ranking', component: RankingComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
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
    NotFoundPageComponent,
    CookingTipComponent,
    CookingTipDetailComponent,
    CreateRecipeComponent,
    CreateNutrientComponent,
    CommentComponent,
    AdminPageComponent,
    HomepageComponent,
    UpdateRecipeComponent,
    RankingComponent,
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
  bootstrap: [],
})
export class AppRoutingModule {}
