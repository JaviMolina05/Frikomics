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
      console.log('Respuesta completa del backend:', response);

      const token = response.data?.accessToken;
      const user = response.data?.user;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Token guardado en localStorage:', token);
      } else {
        console.warn('No se encontró el token en la respuesta');
      }
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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }
}
