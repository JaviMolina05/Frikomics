import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/login', credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user)); 
      })
    );
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, data);
  }
  isAdmin(): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'admin'? true: false; 
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token; 
  }
}
