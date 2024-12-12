import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private baseUrl = ApiPaths.baseUrl;
  private createUser = ApiPaths.CreateUser;

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl + this.createUser, user);
  }
}
