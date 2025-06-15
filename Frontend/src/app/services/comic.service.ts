import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comic } from '../model/comic/comic.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAllComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${this.apiUrl}/comics`);
  }

  getComicById(id: number): Observable<Comic> {
  return this.http.get<Comic>(`${this.apiUrl}/comics/${id}`);
}

  deleteComic(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/comics/${id}`);
  }

  addToFavorites(comicId: number): Observable<any> {
  return this.http.post(`http://localhost:8000/api/favorites`, { comic_id: comicId });
}

}
