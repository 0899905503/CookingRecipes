import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5099/api/Auth/login';
  private tokenKey = 'authToken';
  private deviceUuidKey = 'deviceUuid';
  public isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const token = this.getToken();
    if (token && this.isTokenValid(token)) {
      this.isAuthenticated$.next(true); // Mark as authenticated
    } else {
      this.isAuthenticated$.next(false); // Mark as unauthenticated
    }
  }

  login(
    username: string,
    password: string,
    deviceUuid: string
    //rememberMe: boolean
  ): Observable<any> {
    deviceUuid = this.getDeviceUuid();
    return this.http
      .post<any>(this.apiUrl, { username, password, deviceUuid })
      .pipe(
        tap((response) => {
          if (response.data && response.data.token) {
            this.storeToken(response.data.token);
            this.isAuthenticated$.next(true);
            console.log(
              'Login successful, isAuthenticated:',
              this.isAuthenticated$.value
            );
          } else {
            this.isAuthenticated$.next(false);
          }
        }),
        catchError((error) => {
          console.error('Login failed', error);
          if (error.status === 401) {
            console.log('Unauthorized: Token may be invalid or expired');
          }
          throw error;
        })
      );
  }

  public getDeviceUuid(): string {
    if (isPlatformBrowser(this.platformId)) {
      let deviceUuid = localStorage.getItem(this.deviceUuidKey);
      if (!deviceUuid) {
        deviceUuid = uuidv4();
        localStorage.setItem(this.deviceUuidKey, deviceUuid);
      }
      return deviceUuid;
    }
    return '';
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    console.log('Token retrieved:', token);
    return this.isAuthenticated$.value && token !== null;
  }

  logout(): void {
    this.removeToken();
    this.isAuthenticated$.next(false);
  }

  hasToken(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  storeToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token); // Lưu token vào localStorage
      console.log('Token stored:', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey); // Lấy token từ localStorage
    }
    return null;
  }

  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.tokenKey);
    }
  }

  private isTokenValid(token: string): boolean {
    return true;
  }
}
