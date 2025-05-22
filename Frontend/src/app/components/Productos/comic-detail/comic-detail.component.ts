import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../../../services/comic.service';
import { Comic } from '../../../model/comic/comic.model';

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
    private comicService: ComicService
  ) {}

  ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  console.log('ID recibido en detalle:', id);
  if (id) {
    this.comicService.getComicById(id).subscribe({
      next: (comic) => {
        console.log('Cómic recibido:', comic);
        this.comic = comic;
        console.log(this.comic);
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

}
