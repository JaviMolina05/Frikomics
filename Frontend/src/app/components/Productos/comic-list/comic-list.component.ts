// comic-list.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comic } from '../../../model/comic/comic.model';
import { AuthService } from '../../../services/auth.service.spec';
import { ComicService } from '../../../services/comic.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  standalone: false
})
export class ComicListComponent {
  @Input() comic!: Comic;
  @Output() comicDeleted = new EventEmitter<number>();
  @Output() comicDetail = new EventEmitter<number>();
  constructor(public authService: AuthService, private comicService: ComicService, private router: Router, private cartService: CartService) { }
  public deleteComic(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este cómic?')) {
      this.comicService.deleteComic(id).subscribe({
        next: () => {
          alert('Cómic eliminado');
          this.comicDeleted.emit(id);
        },
        error: () => {
          alert('Error al eliminar el cómic');
        },
      });
    }
  }
  public detailComic(id: number) {
  this.router.navigate(['/detalle', id]);  
}
addToCart() {
    this.cartService.addToCart(this.comic.id, 1).subscribe({
      next: (res) => {
        console.log(this.comic.id);
        alert('Producto añadido al carrito');
      },
      error: (err) => {
        alert('Error al añadir al carrito, intentelo mas tarde'); //TODO: Modificar las alertas
      }
    });
  }
addToFavorites() {
  this.comicService.addToFavorites(this.comic.id).subscribe({
    next: () => {
      alert('Cómic añadido a favoritos');
    },
    error: () => {
      alert('Error al añadir a favoritos');
    }
  });
}
}
