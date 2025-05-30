import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../model/comic/comic.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getFavorites(): Observable<{ favorites: Comic[] }> {
    return this.http.get<{ favorites: Comic[] }>(`${this.apiUrl}/favorites`);
  }

  removeFavorite(comicId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${comicId}`);
  }
}
