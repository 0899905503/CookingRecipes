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
  private getSimilar = ApiPaths.GetSimilar;

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
    return this.http.get<any[]>(this.baseUrl + this.getSimilar + id, {
      headers,
    });
  }
}
