import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:5099/api/v1/Recipe/Get-all'; // Đường dẫn đến API
  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
