import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { ApiPaths } from '../../../Shared/Value/Constant/apiConstant';
import { RecaptchaComponent } from 'ng-recaptcha';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5099/api/Auth/login';
  private tokenKey = 'authToken';
  private deviceUuidKey = 'deviceUuid';
  //UserId
  private userIdKey = 'userId'; // key lưu trong localStorage
  private userId: number | null = null;
  //Role
  private role = 'role';

  //Infor
  private avt = 'avt';
  private email1 = 'email';

  public isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());
  private baseAuthsUrl = ApiPaths.baseAuthUrl;
  private sendOtp = ApiPaths.SendOtp;
  private verifyOtp = ApiPaths.VerifyOtp;
  private resetPassword = ApiPaths.ResetPassword;
  private guest = ApiPaths.Guest;

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
  Role: any;
  avatar1: any;
  email: any;
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
            this.Role = response.data.user.role;
            this.avatar1 = response.data.user.avatar;
            this.userId = Number(response.data.user.userId); // giả sử userId nằm ở đây
            this.email = response.data.user.email;
            if (isPlatformBrowser(this.platformId)) {
              if (this.userId != null) {
                // khác null và undefined
                localStorage.setItem(this.userIdKey, this.userId.toString());
                localStorage.setItem(this.role, this.Role);
                localStorage.setItem(this.email1, this.email);
                localStorage.setItem(this.avt, this.avatar1);
              }
            }
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
    this.userId = null;
    this.Role = '';
    this.avatar1 = '';
    this.email = '';

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.userIdKey);
      localStorage.removeItem(this.role);
      localStorage.removeItem(this.email1);
      localStorage.removeItem(this.avt);
      // Nếu bạn muốn xóa deviceUuid thì thêm dòng này, nhưng thường giữ lại để nhận dạng thiết bị
      // localStorage.removeItem(this.deviceUuidKey);
    }
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

  sendOtpS(email: string) {
    return this.http.post<any>(this.baseAuthsUrl + this.sendOtp, { email });
  }

  verifyOtpS(email: string, otp: string) {
    return this.http.post<any>(this.baseAuthsUrl + this.verifyOtp, {
      email,
      otp,
    });
  }

  resetPasswordS(email: string, newPassword: string) {
    return this.http.post<any>(this.baseAuthsUrl + this.resetPassword, {
      email,
      newPassword,
    });
  }

  getUserId(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem(this.userIdKey);
      return id ? Number(id) : null;
    }
    return null;
  }
  getRole(): string {
    if (!this.Role && isPlatformBrowser(this.platformId)) {
      this.Role = localStorage.getItem(this.role) || '';
    }
    return this.Role;
  }
  //GUEST
  loginGuest(name: string, recaptchaToken: string) {
    return this.http
      .post<any>(`${this.baseAuthsUrl}${this.guest}`, {
        name,
        recaptchaToken,
      })
      .pipe(
        tap((response) => {
          if (response.role && response.token) {
            localStorage.setItem(this.role, response.role);
            localStorage.setItem(this.tokenKey, response.token);
            this.isAuthenticated$.next(true);
          }
        })
      );
  }
}
