import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData, {
      withCredentials: true 
    });
  }
  register(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, data);
}
}
