import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';
import { log } from 'console';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CreateRecipeService {
  private baseUrl = ApiPaths.baseUrl;
  private createRecipes = ApiPaths.CreateRecipe;
  private createIngredients = ApiPaths.CreateRecipeIngredient;
  private createRecipeTools = ApiPaths.CreateRecipeTool;
  private createNutrients = ApiPaths.CreateRecipeNutrient;
  private createInstructions = ApiPaths.CreateInstruction;
  private createRecipeTips = ApiPaths.CreateRecipeTip;

  constructor(private http: HttpClient) {}

  createRecipe(data: FormData) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.baseUrl + this.createRecipes}`, data, {
      headers,
    });
  }

  addRecipeIngredient(recipeIngredients: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      this.baseUrl + this.createIngredients,
      recipeIngredients,
      {
        headers,
      }
    );
  }

  addRecipeTool(data: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.baseUrl + this.createRecipeTools, data, {
      headers,
    });
  }

  addRecipeNutrient(data: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.baseUrl + this.createNutrients, data, {
      headers,
    });
  }

  addRecipeInstruction(data: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.baseUrl + this.createInstructions, data, {
      headers,
    });
  }

  addRecipeTip(data: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.baseUrl + this.createRecipeTips, data, {
      headers,
    });
  }
}
