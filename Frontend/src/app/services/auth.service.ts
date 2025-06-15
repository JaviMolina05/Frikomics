import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private userChanged = new Subject<void>();
  userChanged$ = this.userChanged.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Ajusta según el formato exacto de tu backend
        const token = response.data?.accessToken || response.access_token;
        const user = response.data?.user || response.user;

        if (token && user) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.userChanged.next(); // Emitir cambio
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userChanged.next(); // Emitir cambio
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUserId(): number | null {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.id || null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'admin';
  }
}
