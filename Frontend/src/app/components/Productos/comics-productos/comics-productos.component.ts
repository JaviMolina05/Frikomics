// comics-productos.component.ts
import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../../services/comic.service';
import { Comic } from '../../../model/comic/comic.model';
import { AuthService } from '../../../services/auth.service.spec';

@Component({
  selector: 'app-comics-productos',
  templateUrl: './comics-productos.component.html',
  styleUrls: ['./comics-productos.component.scss'],
  standalone: false
})
export class ComicsProductosComponent implements OnInit {
  isSidebarOpen = false;

  comics: Comic[] = [];
  isLoading = true;
  error: string = '';

  constructor(
    private comicService: ComicService,
    public authService: AuthService
  ) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  loadComics() {
    this.comicService.getAllComics().subscribe({
      next: (res: any) => {
        this.comics = res.comics ?? res.data ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Error al cargar los cómics.';
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.loadComics();
  }

  trackById(index: number, comic: Comic) {
    return comic.id;
  }
  
  handleComicDeleted(deletedId: number) {
    this.comics = this.comics.filter(comic => comic.id !== deletedId);
  }

}
