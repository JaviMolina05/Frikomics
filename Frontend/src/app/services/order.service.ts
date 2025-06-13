import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order/order.module';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/orders'; // Ajusta según tu backend

  constructor(private http: HttpClient) { }

  /**
   * Crea un nuevo pedido a partir del carrito del usuario autenticado.
   */
  createOrderFromCart(): Observable<any> {
    return this.http.post(this.apiUrl, {});
  }

  /**
   * Obtiene el historial de pedidos del usuario autenticado.
   */
  getOrderHistory(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
