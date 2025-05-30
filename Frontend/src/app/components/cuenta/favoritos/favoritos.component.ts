import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comic } from '../../../model/comic/comic.model';
import { AuthService } from '../../../services/auth.service.spec';

import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent {
  favoritos: Comic[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (res) => {
        this.favoritos = res.favorites;
      },
      error: () => {
        alert('Error al cargar favoritos');
      }
    });
  }

  deleteComic(id: number): void {
    if (confirm('¿Eliminar este cómic de favoritos?')) {
      this.favoriteService.removeFavorite(id).subscribe({
        next: () => {
          this.favoritos = this.favoritos.filter(c => c.id !== id);
          alert('Eliminado de favoritos');
        },
        error: () => {
          alert('Error al eliminar de favoritos');
        }
      });
    }
  }

  addToCart(comic: Comic): void {
    this.cartService.addToCart(comic.id, 1).subscribe({
      next: () => alert('Añadido al carrito'),
      error: () => alert('Error al añadir al carrito'),
    });
  }

  detailComic(id: number): void {
    this.router.navigate(['/detalle', id]);
  }
}