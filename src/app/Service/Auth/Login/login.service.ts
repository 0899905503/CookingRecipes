// src/app/services/auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  ) {}

  login(
    username: string,
    passwordHash: string,
    deviceUuid: string
  ): Observable<any> {
    deviceUuid = this.getDeviceUuid();
    return this.http
      .post<any>(this.apiUrl, { username, passwordHash, deviceUuid })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.storeToken(response.token);
            this.isAuthenticated$.next(true);
            console.log(
              'Login successful, isAuthenticated:',
              this.isAuthenticated$.value
            );
          }
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

  private storeToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
      console.log('Token stored:', token);
    }
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.tokenKey);
      console.log('Token from localStorage:', token);
      return token;
    }
    return null;
  }

  private removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }
}
