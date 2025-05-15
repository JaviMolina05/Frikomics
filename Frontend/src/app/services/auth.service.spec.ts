import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, data);
  }
  isAdmin(): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'admin'; // o según cómo lo llames en la base de datos
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token; 
  }
}
