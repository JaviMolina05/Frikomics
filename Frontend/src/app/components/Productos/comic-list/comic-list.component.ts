import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { Comic } from '../../../model/comic/comic.model';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {
  comics: Comic[] = [];
  isLoading = true;
  error: string = '';

  constructor(private comicService: ComicService) {}

  ngOnInit(): void {
    this.comicService.getAllComics().subscribe({
      next: (data) => {
        this.comics = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los cómics.';
        this.isLoading = false;
      }
    });
  }
}
