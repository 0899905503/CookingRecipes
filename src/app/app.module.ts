import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
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
import { CookingTipComponent } from './Shared/Component/cooking-tip/cooking-tip.component';
import { CookingTipDetailComponent } from './Page/cooking-tip-detail/cooking-tip-detail.component';
import { CreateRecipeComponent } from './Page/create-recipe/create-recipe.component';
import { AuthInterceptor } from './Intercepter/auth.interceptor';
import { HomepageComponent } from './Page/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateNutrientComponent } from './Shared/Component/CreateRecipes/create-nutrient/create-nutrient.component';
import { CommentComponent } from './Shared/Component/comment/comment.component';
import { AdminPageComponent } from './Page/admin-page/admin-page.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// For ng2-charts v4 and above, use NgChartsModule; for older versions, use ChartsModule
// If you get an error, try: import { ChartsModule } from 'ng2-charts';

// Hàm tải file dịch
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    HomepageComponent,
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
    CookingTipComponent,
    CookingTipDetailComponent,
    CreateRecipeComponent,
    CreateNutrientComponent,
    CommentComponent,
    AdminPageComponent,
    HomepageComponent,
  ],
  imports: [
    CookingTipComponent,
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
    CookingTipDetailComponent,
    CreateRecipeComponent,
    CreateNutrientComponent,
    CommentComponent,
    AdminPageComponent,
    HomepageComponent,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateModule,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [RecipeMainComponent, RegisterComponent, AuthComponent],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Sử dụng API mới
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Đăng ký AuthInterceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
