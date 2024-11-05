// src/app/services/auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5099/api/Auth/login'; // Thay thế bằng API URL của bạn
  private tokenKey = 'authToken'; // Khóa để lưu token trong localStorage
  public isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Gửi yêu cầu đăng nhập tới API
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap((response) => {
        if (response && response.token) {
          this.storeToken(response.token);
          this.isAuthenticated$.next(true);
        }
      })
    );
  }

  // Đăng xuất và xóa token
  logout(): void {
    this.removeToken();
    this.isAuthenticated$.next(false);
  }

  // Kiểm tra token tồn tại trong localStorage
  private hasToken(): boolean {
    return this.getToken() !== null;
  }

  private storeToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }
}
