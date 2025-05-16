// comic-list.component.ts
import { Component, Input } from '@angular/core';
import { Comic } from '../../../model/comic/comic.model';
import { AuthService } from '../../../services/auth.service.spec';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  standalone: false
})
export class ComicListComponent {
  @Input() comic!: Comic; 
  constructor(public authService: AuthService){}
}
