import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  return this.http.post(`${this.apiUrl}/register`, data);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAdmin(): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'admin'; 
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
