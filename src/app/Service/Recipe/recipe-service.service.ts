import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = ApiPaths.baseUrl;
  private getAllRecipe = ApiPaths.GetAllRecipe;
  private getById = ApiPaths.GetByIdRecipe;
  private createFavoriteRecipe = ApiPaths.CreateFavoriteRecipe;
  private deleteFavoriteRecipe = ApiPaths.DeleteFavoriteRecipe;
  private checkFavoriteRecipe = ApiPaths.CheckFavoriteRecipe;
  private getCommntentByRecipeId = ApiPaths.GetCommentByRecipeId;
  private createComments = ApiPaths.CreateComment;
  private getSimilarRecipe = ApiPaths.GetSimilar;

  private deleteRecipe = ApiPaths.DeleteRecipe;
  // get by user
  private getByUserId = ApiPaths.GetByUserId;

  //update
  private UpdateRecipeById = ApiPaths.UpdateRecipeById;
  private UpdateRecipeTool = ApiPaths.UpdateRecipeTool;
  private UpdateInstuction = ApiPaths.UpdateInstuction;
  private UpdateRecipeIngredient = ApiPaths.UpdateRecipeIngredient;
  private UpdateRecipeNutrient = ApiPaths.UpdateRecipeNutrient;
  private UpdateRecipeTip = ApiPaths.UpdateRecipeTip;

  //RANKING
  private GetTopRank = ApiPaths.GetTopRank;

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(this.baseUrl + this.getAllRecipe, { headers });
  }

  getByIdRecipes(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(this.baseUrl + this.getById + id, { headers });
  }

  getSimilarRecipes(id: number): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(this.baseUrl + this.getSimilarRecipe + id, {
      headers,
    });
  }

  createFavorite(recipeId: number, userId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const payload = { recipeId, userId };
    console.log('Sending createFavorite request with payload:', payload); // Log kiểm tra
    return this.http.post(
      `${this.baseUrl}${this.createFavoriteRecipe}`,
      payload,
      { headers }
    );
  }

  checkFavorite(recipeId: number, userId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.checkFavoriteRecipe}/${recipeId}/${userId}`;
    console.log('Sending checkFavorite request to:', url); // Log kiểm tra
    return this.http.get<any>(url, { headers });
  }

  deleteFavorite(recipeId: number, userId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.deleteFavoriteRecipe}/${recipeId}/${userId}`;
    console.log('Sending deleteFavorite request to:', url); // Log kiểm tra
    return this.http.delete(url, { headers });
  }

  getCommentByRecipeId(recipeId: number): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(
      this.baseUrl + this.getCommntentByRecipeId + recipeId,
      {
        headers,
      }
    );
  }
  createComment(comment: {}): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const payload = comment;
    console.log('Sending createComment request with payload:', payload); // Log kiểm tra
    return this.http.post(`${this.baseUrl}${this.createComments}`, payload, {
      headers,
    });
  }

  updateRecipeById(recipeId: number, recipeData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.UpdateRecipeById}${recipeId}`;
    console.log('Sending updateRecipe request to:', url); // Log kiểm tra
    return this.http.put(url, recipeData, { headers });
  }

  deleteRecipes(recipeId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.deleteRecipe}${recipeId}`;
    console.log('Sending deleteFavorite request to:', url); // Log kiểm tra
    return this.http.delete(url, { headers });
  }

  getRecipeByUserId(recipeId: number): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(this.baseUrl + this.getByUserId + recipeId, {
      headers,
    });
  }

  updateRecipeToolByReipceId(
    recipeId: number,
    recipeTool: any
  ): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.UpdateRecipeTool}${recipeId}`;
    console.log('Sending updateRecipe request to:', url); // Log kiểm tra
    return this.http.put(url, recipeTool, { headers });
  }

  updateRecipeIngredientByRecipeId(
    recipeId: number,
    recipeIngredientData: any
  ): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.UpdateRecipeIngredient}${recipeId}`;
    console.log('Sending updateRecipe request to:', url); // Log kiểm tra
    return this.http.put(url, recipeIngredientData, { headers });
  }

  updateRecipeNutrientByRecipeId(
    recipeId: number,
    recipeNutrientData: any
  ): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.UpdateRecipeNutrient}${recipeId}`;
    console.log('Sending updateRecipe request to:', url); // Log kiểm tra
    return this.http.put(url, recipeNutrientData, { headers });
  }

  updateRecipeTipByRecipeId(
    recipeId: number,
    recipeTipData: any
  ): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.UpdateRecipeTip}${recipeId}`;
    console.log('Sending updateRecipe request to:', url); // Log kiểm tra
    return this.http.put(url, recipeTipData, { headers });
  }

  updateInstructionbyRecipeId(
    recipeId: number,
    instructions: any
  ): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.UpdateInstuction}${recipeId}`;
    console.log('Sending updateRecipe request to:', url); // Log kiểm tra
    return this.http.put(url, instructions, { headers });
  }

  //Ranking
  getRanks(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(this.baseUrl + this.GetTopRank, { headers });
  }
}
