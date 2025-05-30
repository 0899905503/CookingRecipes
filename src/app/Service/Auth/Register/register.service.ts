import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPaths } from '../../../Shared/Value/Constant/apiConstant';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private baseUrl = ApiPaths.baseAuthUrl;
  private createUser = ApiPaths.Register;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(this.baseUrl + this.createUser, user);
  }
}
