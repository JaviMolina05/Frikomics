// comic-list.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comic } from '../../../model/comic/comic.model';
import { AuthService } from '../../../services/auth.service.spec';
import { ComicService } from '../../../services/comic.service';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  standalone: false
})
export class ComicListComponent {
  @Input() comic!: Comic; 
  @Output() comicDeleted = new EventEmitter<number>();
  constructor(public authService: AuthService,  private comicService: ComicService){}
  public deleteComic(id: number){
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
}
