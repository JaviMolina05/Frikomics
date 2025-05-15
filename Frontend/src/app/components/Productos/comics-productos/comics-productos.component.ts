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
  comics: Comic[] = [];
  isLoading = true;
  error: string = '';

  constructor(
    private comicService: ComicService,
    public authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.comicService.getAllComics().subscribe({
      next: (data: any) => {
        this.comics = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar los cómics.';
        this.isLoading = false;
      }
    });
  }
  trackById(index: number, comic: Comic) {
    return comic.id;
  }  

}
