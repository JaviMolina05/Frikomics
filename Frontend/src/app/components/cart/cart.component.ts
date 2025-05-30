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
  total: number = 0;
  shippingCost: number = 0;
  envioSeleccionado: string = '';
  subtotal: number = 0;

  constructor(
    public authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.getCart(userId).subscribe({
        next: (response: CartResponse) => {
          this.cartItems = response?.items || [];
          this.calcularTotal();
        },
        error: (error) => {
          console.error('Error al cargar el carrito', error);
          this.cartItems = [];
        }
      });
    } else {
      this.cartItems = [];
    }
  }

  calcularTotal(): void {
  this.subtotal = this.cartItems.reduce((acc, item) => acc + item.total_price, 0);
  this.total = this.subtotal + this.shippingCost;
}

  onFormaEnvioChange(event: Event): void {
    const valor = (event.target as HTMLSelectElement).value;
    this.envioSeleccionado = valor;

    this.shippingCost = valor === 'Envio' ? 3 : 0;
    this.calcularTotal();
  }

  actualizar(index: number): void {
    const userId = this.authService.getUserId();
    if (!userId) return;

    const item = this.cartItems[index];

    this.cartService.updateCartItem(userId, item).subscribe({
      next: (response) => {
        this.calcularTotal();
      },
      error: (err) => {
        console.error('Error al actualizar el item:', err);
      }
    });
  }

  eliminar(index: number) {
    const item = this.cartItems[index];

    this.cartService.removeItem(item.comic_id).subscribe({
      next: () => {
        this.cartItems.splice(index, 1);
        this.calcularTotal();
      },
      error: (err) => {
        console.error('Error al remover el item:', err);
      }
    });
  }
}
