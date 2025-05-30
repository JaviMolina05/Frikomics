import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { CartItem } from '../model/cart-item/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   private apiUrl = 'http://localhost:8000/api';

  private cartChanged = new Subject<void>();
  cartChanged$ = this.cartChanged.asObservable();

  constructor(private http: HttpClient) {}

  notifyCartChanged(): void {
    this.cartChanged.next();
  }

  // ✅ Añadir producto al carrito
  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart-items`, {
      product_id: productId,
      quantity
    }).pipe(
      tap(() => this.notifyCartChanged()) // 🔁 Emitir actualización
    );;
  }

  // ✅ Obtener carrito del usuario autenticado
  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/${userId}`);
  }

  // ✅ Actualizar carrito del usuario autenticado
  updateCartItem(userId: number, item: CartItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart-items/${item.comic_id}`, {
      product_id: item.comic_id, 
      quantity: item.quantity
    }).pipe(
      tap(() => this.notifyCartChanged()) 
    );;
  }
  
  // ✅ Eliminar un producto del carrito
  removeItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart-items/${itemId}`).pipe(
      tap(() => this.notifyCartChanged()) 
    );;
  }

  // ✅ Vaciar el carrito
  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/clear`).pipe(
      tap(() => this.notifyCartChanged()) 
    );;
  }
}
