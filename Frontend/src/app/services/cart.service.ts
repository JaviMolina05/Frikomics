import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // ✅ Añadir producto al carrito
  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart-items`, {
      product_id: productId,
      quantity
    });
  }

  // ✅ Obtener carrito del usuario autenticado
  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/${userId}`);
  }

  // ✅ Eliminar un producto del carrito
  removeItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart-items/${itemId}`);
  }

  // ✅ Vaciar el carrito
  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/clear`);
  }
}
