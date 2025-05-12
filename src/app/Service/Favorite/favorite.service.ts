import { Injectable } from '@angular/core';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private http: HttpClient) {}
  private baseUrl = ApiPaths.baseUrl;
  private getFavorite = ApiPaths.GetFavoriteRecipeByUserId;

  getFavoriteRecipeByUserId(userId: number): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(this.baseUrl + this.getFavorite + userId, {
      headers,
    });
  }
}
