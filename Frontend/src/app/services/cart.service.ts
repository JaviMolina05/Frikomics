import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../model/cart-item/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

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

  // ✅ Actualizar carrito del usuario autenticado
  updateCartItem(userId: number, item: CartItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart-items/${userId}`, {
      product_id: item.comic_id, // o item.comic_id, según el campo
      quantity: item.quantity
    });
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
