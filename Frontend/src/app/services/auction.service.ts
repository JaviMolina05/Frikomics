import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private baseUrl = 'http://localhost:8000/api/auctions'; 

  constructor(private http: HttpClient) {}

  // Obtener todas las subastas
  getAuctions(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Obtener una subasta por ID
  getAuction(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Crear una subasta
  createAuction(data: FormData): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // Actualizar una subasta
  updateAuction(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Eliminar una subasta
  deleteAuction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
