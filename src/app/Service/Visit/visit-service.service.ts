import { Injectable } from '@angular/core';
import { ApiPaths } from '../../Shared/Value/Constant/apiConstant';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisitServiceService {
  private baseUrl = ApiPaths.baseVisit;
  private postVisit = ApiPaths.PostVisit;
  private bydate = ApiPaths.ByDate;
  private bymonth = ApiPaths.Monthly;
  private getDate = ApiPaths.GetDate;
  private getweek = ApiPaths.GetWeek;
  private getmonth = ApiPaths.GetMonth;
  private getyear = ApiPaths.GetYear;

  constructor(private http: HttpClient) {}

  // Gọi API để lưu lượt truy cập, gửi thêm ipAddress và userAgent nếu có
  logVisit(
    route: string,
    ipAddress?: string,
    userAgent?: string
  ): Observable<any> {
    const body = { route, ipAddress, userAgent };
    return this.http.post(`${this.baseUrl}${this.postVisit}`, body);
  }

  // Gọi API lấy tổng số lượt truy cập theo ngày (mặc định ngày hôm nay)
  getAllVisits(date?: string): Observable<any> {
    // Nếu có truyền date, thêm param
    let params = new HttpParams();
    if (date) {
      params = params.set('date', date);
    }
    return this.http.get(`${this.baseUrl}${this.bydate}`, { params });
  }

  // Gọi API lấy thống kê theo tháng, cần truyền năm
  getVisitStats(year: number): Observable<any> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get(`${this.baseUrl}${this.bymonth}`, { params });
  }

  // Tổng lượt truy cập theo ngày
  getTotalByDate(date: string): Observable<any> {
    const params = new HttpParams().set('date', date);
    return this.http.get(`${this.baseUrl}${this.bydate}`, { params });
  }

  // Tổng lượt truy cập theo tuần
  getTotalByWeek(year: number, weekNumber: number): Observable<any> {
    const params = new HttpParams()
      .set('year', year.toString())
      .set('weekNumber', weekNumber.toString());
    return this.http.get(`${this.baseUrl}${this.getweek}`, { params });
  }

  // Tổng lượt truy cập theo tháng
  getTotalByMonth(year: number): Observable<any> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get(`${this.baseUrl}${this.getmonth}`, { params });
  }

  // Tổng lượt truy cập theo năm
  getTotalByYear(year: number): Observable<any> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get(`${this.baseUrl}${this.getyear}`, { params });
  }
}
