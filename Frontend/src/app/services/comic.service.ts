import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comic } from '../model/comic/comic.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  getAll() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAllComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${this.apiUrl}/comics`);
  }

  deleteComic(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/comics/${id}`);
  }
}
