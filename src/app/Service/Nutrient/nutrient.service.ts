import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NutrientService {
  constructor(private http: HttpClient) {}

  private baseUrl = ApiPaths.baseUrl;
  private getAllNutrient = ApiPaths.GetAllNutrient;

  getAllNuntrients(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(this.baseUrl + this.getAllNutrient, {
      headers,
    });
  }
}
