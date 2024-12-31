import { Injectable } from '@angular/core';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TipService {
  private baseUrl = ApiPaths.baseUrl;
  private getAllTip = ApiPaths.GetAllTip;
  private getTipById = ApiPaths.GetByIdTip;
  private getNewRecipe = ApiPaths.GetNewRecipe;

  constructor(private http: HttpClient) {}

  getAllTips(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.baseUrl + this.getAllTip}`);
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseUrl + this.getAllTip}`, {
      headers,
    });
  }

  getByIdTips(id: number): Observable<any> {
    // return this.http.get<any>(`${this.baseUrl + this.getTipById + id}`);
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseUrl + this.getAllTip + id}`, {
      headers,
    });
  }

  getNewRecipes(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.baseUrl + this.getNewRecipe}`);
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseUrl + this.getNewRecipe}`, {
      headers,
    });
  }
}
