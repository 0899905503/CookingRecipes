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
  private getAllCookingTip = ApiPaths.GetAllCookingTip;
  private CreateCookingTips = ApiPaths.CreateCookingTip;
  private UpdateCookingTips = ApiPaths.UpdateCookingTip;
  private DeleteCookingTips = ApiPaths.DeleteCookingTip;

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

  getAllCookingTips(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseUrl + this.getAllCookingTip}`, {
      headers,
    });
  }

  createCookingTip(cookingTip: {}): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const payload = cookingTip;
    console.log('Sending createCookingTip request with payload:', payload);
    return this.http.post(`${this.baseUrl}${this.CreateCookingTips}`, payload, {
      headers,
    });
  }

  updateCookingTip(cookingTipId: number, cookingTipData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.baseUrl}${this.UpdateCookingTips}${cookingTipId}`;
    console.log('Sending updateRecipe request to:', url); // Log kiểm tra
    return this.http.put(url, cookingTipData, { headers });
  }

  deleteCookingTip(cookingTipId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.DeleteCookingTips}${cookingTipId}`;
    console.log('Sending deleteFavorite request to:', url); // Log kiểm tra
    return this.http.delete(url, { headers });
  }
}
