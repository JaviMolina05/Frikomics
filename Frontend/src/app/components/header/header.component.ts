import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cart-item/cart-item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  showCart = false;

  private subs: Subscription[] = [];

  constructor(
    public authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCart();

    // 🔁 Escucha cuando se añade/actualiza/vacía el carrito
    this.subs.push(this.cartService.cartChanged$.subscribe(() => {
      this.loadCart();
    }));

    // 🔁 Escucha login/logout
    this.subs.push(this.authService.userChanged$.subscribe(() => {
      this.loadCart();
    }));
  }

  loadCart(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.getCart(userId).subscribe({
        next: (res) => this.cartItems = res.items || [],
        error: () => this.cartItems = []
      });
    } else {
      this.cartItems = [];
    }
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}


