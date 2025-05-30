import { Injectable } from '@angular/core';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = ApiPaths.baseUrl;
  private getAllComments = ApiPaths.GetAllComment;
  private getReports = ApiPaths.GetReport;
  private updateComments = ApiPaths.UpdateComment;
  private deleteComments = ApiPaths.DeleteComment;
  private getAllUser = ApiPaths.GetAllUser;
  private updateUser = ApiPaths.UpdateUser;
  private getUserById = ApiPaths.GetUserById;
  private deleteUser = ApiPaths.DeleteUser;
  private updateAvatar = ApiPaths.UpdateAvatar;

  constructor(private http: HttpClient) {}

  getAllComment(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseUrl + this.getAllComments}`, {
      headers,
    });
  }
  getReport(year: number): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseUrl + this.getReports + year}`, {
      headers,
    });
  }

  updateComment(CommentId: number, CommentData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.baseUrl}${this.updateComments}${CommentId}`;
    console.log('Sending updateRecipe request to:', url); // Log kiểm tra
    return this.http.put(url, CommentData, { headers });
  }

  deleteComment(CommentId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.deleteComments}${CommentId}`;
    console.log('Sending deleteFavorite request to:', url); // Log kiểm tra
    return this.http.delete(url, { headers });
  }
  getAllUsers(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.baseUrl + this.getAllUser}`, {
      headers,
    });
  }

  updateUsers(userId: number, User: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${this.updateUser}${userId}`;
    console.log('Sending updateRecipe request to:', url); // Log kiểm tra
    return this.http.put(url, User, { headers });
  }

  updateAvatars(userId: number, file: File): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();
    formData.append('avatar', file); // avatar phải khớp tên backend nhận

    const url = `${this.baseUrl}${this.updateAvatar}${userId}`;
    console.log('Sending updateAvatar request to:', url); // Log kiểm tra

    return this.http.post(url, formData, { headers });
  }
}
