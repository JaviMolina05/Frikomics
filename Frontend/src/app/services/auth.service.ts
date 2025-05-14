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

  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token; 
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  /*constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // Redirige a login si no hay sesión
      window.location.href = '/login';
    }

    // Si hay token, puedes hacer peticiones aquí
    const token = this.authService.getToken();
    console.log('Token activo:', token);
  }*/
}
