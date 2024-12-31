import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { type Observable } from 'rxjs';
import { AppSettingService } from './app-setting.service';

export const METHOD_GET: string = 'get';
export const METHOD_PUT: string = 'put';
export const METHOD_POST: string = 'post';
export const METHOD_DELETE: string = 'delete';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly settingService = inject(AppSettingService);
  protected apiGet<T>(
    path: string,
    params: HttpParams,
    hasToken: boolean = true,
    isLoading: boolean = true
  ): Observable<T> {
    return this.apiRun(
      METHOD_GET,
      path,
      null,
      params,
      hasToken,
      undefined,
      undefined,
      isLoading
    );
  }

  protected apiGetCustom<T>(
    path: string,
    params?: HttpParams,
    observe: 'body' = 'body',
    responseType: 'blob' = 'blob',
    isLoading: boolean = true
  ): Observable<T> {
    return this.apiRun(
      METHOD_GET,
      path,
      null,
      params ?? new HttpParams(),
      true,
      observe,
      responseType as 'json',
      isLoading
    );
  }

  protected apiPostCustom<T>(
    path: string,
    body: any = null,
    params: HttpParams,
    observe: 'body' = 'body',
    responseType: 'blob' = 'blob',
    isLoading: boolean = true
  ): Observable<T> {
    return this.apiRun(
      METHOD_POST,
      path,
      body,
      params,
      true,
      observe,
      responseType as 'json',
      isLoading
    );
  }

  protected apiPutCustom<T>(
    path: string,
    body: any = null,
    params: HttpParams,
    observe: 'body' = 'body',
    responseType: 'blob' = 'blob',
    isLoading: boolean = true
  ): Observable<T> {
    return this.apiRun(
      METHOD_PUT,
      path,
      body,
      params,
      true,
      observe,
      responseType as 'json',
      isLoading
    );
  }

  protected apiPost<T>(
    path: string,
    body: any = null,
    params: HttpParams,
    hasToken: boolean = true,
    isLoading: boolean = true
  ): Observable<T> {
    return this.apiRun(
      METHOD_POST,
      path,
      body,
      params,
      hasToken,
      undefined,
      undefined,
      isLoading
    );
  }

  protected apiPut<T>(
    path: string,
    body: any = null,
    params: HttpParams,
    hasToken: boolean = true,
    isLoading: boolean = true
  ): Observable<T> {
    return this.apiRun(
      METHOD_PUT,
      path,
      body,
      params,
      hasToken,
      undefined,
      undefined,
      isLoading
    );
  }

  protected apiDelete<T>(
    path: string,
    params: HttpParams,
    hasToken: boolean = true,
    isLoading: boolean = true
  ): Observable<T> {
    return this.apiRun(
      METHOD_DELETE,
      path,
      null,
      params,
      hasToken,
      undefined,
      undefined,
      isLoading
    );
  }

  protected apiDelete2<T>(
    path: string,
    body: any = null,
    params: HttpParams,
    hasToken: boolean = true,
    isLoading: boolean = true
  ): Observable<T> {
    return this.apiRun(
      METHOD_DELETE,
      path,
      body,
      params,
      hasToken,
      undefined,
      undefined,
      isLoading
    );
  }

  protected apiRun<T>(
    method: string,
    path: string,
    body: any = null,
    params: HttpParams,
    hasToken: boolean = true,
    observe?: 'body',
    responseType?: 'json',
    isLoading: boolean = true
  ): Observable<T> {
    // set url
    const url = this.appendUrl(path);

    // set header
    let headers = new HttpHeaders();
    headers = this.appendHeader(headers);
    if (hasToken) {
      headers = this.appendAuthorizationHeader(headers);
    }

    params = params.set('isLoadingRequired', isLoading ? 'true' : 'false');

    switch (method) {
      case METHOD_POST:
        return this.httpClient.post<T>(url, body, {
          params,
          headers,
          observe,
          responseType,
        });
      case METHOD_PUT:
        return this.httpClient.put<T>(url, body, {
          params,
          headers,
          observe,
          responseType,
        });
      case METHOD_DELETE:
        return this.httpClient.delete<T>(url, {
          params,
          headers,
          body,
        });
      default:
        return this.httpClient.get<T>(url, {
          headers,
          params,
          observe,
          responseType,
        });
    }
  }

  private appendUrl(path: string): string {
    const apiUrl = this.settingService.setting.apiUrl;
    return path.startsWith('/') ? `${apiUrl}${path}` : `${apiUrl}/${path}`;
  }

  private appendHeader(headers: HttpHeaders): HttpHeaders {
    return headers;
  }

  private appendAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
    const tokenType = 'Bearer';
    const token = localStorage.getItem('authToken');
    headers = headers.set('Authorization', `${tokenType} ${token}`);
    return headers;
  }
}
