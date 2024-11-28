import { ApiPaths } from './../../Shared/Value/Constant/apiConstant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  constructor(private http: HttpClient) {}
  private baseUrl = ApiPaths.baseUrl;
  private gettopView = ApiPaths.GetTopView;
  private getAllRecipe = ApiPaths.GetAllRecipe;

  getTopView(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl + this.gettopView}`);
  }

  getAllrecipe(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl + this.getAllRecipe}`);
  }
}
