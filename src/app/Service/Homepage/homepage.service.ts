import { ApiPaths } from './../../Shared/Value/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from '../../Model/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  constructor(private http: HttpClient) {}

  private baseUrl = ApiPaths.baseUrl;
  private gettopView = ApiPaths.GetTopView;
  private getallRecipe = ApiPaths.GetAllRecipe;

  getTopView(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(this.baseUrl + this.gettopView, { headers });
  }

  getAllRecipe(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(this.baseUrl + this.getallRecipe, {
      headers,
    });
  }
}
