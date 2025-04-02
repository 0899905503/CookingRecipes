import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeTipService {
  constructor(private http: HttpClient) {}

  private baseUrl = ApiPaths.baseUrl;
  private createRecipeTips = ApiPaths.CreateRecipeTip;

  createRecipeTip(recipeTip: any[]): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any[]>(
      this.baseUrl + this.createRecipeTips,
      recipeTip,
      { headers }
    );
  }
}
