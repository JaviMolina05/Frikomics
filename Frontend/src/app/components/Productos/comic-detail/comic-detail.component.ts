import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../../../services/comic.service';
import { Comic } from '../../../model/comic/comic.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-comic-detail',
  standalone: false,
  templateUrl: './comic-detail.component.html',
  styleUrl: './comic-detail.component.scss'
})
export class ComicDetailComponent {
  comic?: Comic;

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido en detalle:', id);
    if (id) {
      this.comicService.getComicById(id).subscribe({
        next: (comic) => {
          this.comic = comic;
        },
        error: (err) => {
          console.error('Error al cargar el cómic', err);
          alert('Error al cargar el cómic');
        }
      });
    } else {
      alert('ID inválido');
    }
  }
  addToCart(comic: Comic) {
    this.cartService.addToCart(comic.id, 1).subscribe({
      next: () => {
        alert(`Producto "${comic.title}" añadido al carrito`);
      },
      error: () => {
        alert('Error al añadir al carrito, inténtelo más tarde');
      }
    });
  }

  addToFavorites(comic: Comic) {
    this.comicService.addToFavorites(comic.id).subscribe({
      next: () => {
        localStorage.setItem(`fav-${comic.id}`, 'true');
        alert(`Cómic "${comic.title}" añadido a favoritos`);
      },
      error: () => {
        alert('Error al añadir a favoritos');
      }
    });
  }

  toggleFavorite(comic: Comic) {
    if (this.isFavorite(comic.id)) {
      localStorage.removeItem(`fav-${comic.id}`);
      alert(`"${comic.title}" se quitó de favoritos.`);
    } else {
      this.addToFavorites(comic);
    }
  }

  isFavorite(comicId: number): boolean {
    return !!localStorage.getItem(`fav-${comicId}`);
  }


  removeFromFavorites() {
    if (!this.comic) return;
    localStorage.removeItem(`fav-${this.comic.id}`);
    alert('Cómic eliminado de favoritos');
    // Aquí puedes también hacer una llamada al backend si fuera necesario
  }
}
