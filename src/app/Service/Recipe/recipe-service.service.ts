import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = ApiPaths.baseUrl;
  private getAllRecipe = ApiPaths.GetAllRecipe;
  private getById = ApiPaths.GetByIdRecipe;
  private getSimilar = ApiPaths.GetSimilar;

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl + this.getAllRecipe}`);
  }

  getByIdRecipes(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl + this.getById + id}`);
  }

  getSimilarRecipes(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl + this.getSimilar + id}`);
  }
}
