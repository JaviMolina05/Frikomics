import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/login'; // ajusta el endpoint

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
