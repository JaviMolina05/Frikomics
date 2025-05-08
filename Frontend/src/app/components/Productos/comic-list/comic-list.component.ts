// comic-list.component.ts
import { Component, Input } from '@angular/core';
import { Comic } from '../../../model/comic/comic.model';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  standalone: false
})
export class ComicListComponent {
  @Input() comic!: Comic; // <-- recibir el comic individual
}
