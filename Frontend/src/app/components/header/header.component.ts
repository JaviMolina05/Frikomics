import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service.spec';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public authService: AuthService, private cartService: CartService) { }
  cartItems: any[] = [];
  showCart: boolean = false;
  
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.getCart(userId).subscribe({
        next: (response) => {
          console.log('Respuesta carrito:', response);
          this.cartItems = response || [];
          console.log('Carrito:', this.cartItems.length);
        },
        error: (error) => {
          console.error('Error al cargar el carrito', error);
        }
      });
    }
  }
}

