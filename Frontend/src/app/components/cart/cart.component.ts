import { Component } from '@angular/core';
import { CartResponse } from '../../model/cart-response/cart-response';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart-item/cart-item';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: CartItem[] = [];
    showCart: boolean = false;
    
    constructor(
      public authService: AuthService, 
      private cartService: CartService
    ) { }
  
    ngOnInit(): void {
      this.loadCart();
    }
  
    loadCart(): void {
      const userId = this.authService.getUserId();
      if (userId) {
        this.cartService.getCart(userId).subscribe({
          next: (response: CartResponse) => {
            console.log('Respuesta carrito:', response);
            // Asignar items del response o array vacío si no hay
            this.cartItems = response?.items || [];
            console.log('Carrito:', this.cartItems);
          },
          error: (error) => {
            console.error('Error al cargar el carrito', error);
            this.cartItems = []; // Asegurar que cartItems sea un array vacío en caso de error
          }
        });
      } else {
        this.cartItems = []; // Si no hay userId, vaciar el carrito
      }
    }
  
    // Método para alternar la visualización del carrito
    toggleCart(): void {
      this.showCart = !this.showCart;
    }
}
