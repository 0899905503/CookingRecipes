import { Injectable } from '@angular/core';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CookingTipService {
  private baseUrl = ApiPaths.baseUrl;
  private getByIdCookingTip = ApiPaths.GetByIdCookingTip;
  constructor(private http: HttpClient) {}

  getCookingTip(id: number): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(
      `${this.baseUrl + this.getByIdCookingTip + id}`,
      {
        headers,
      }
    );
  }
}
