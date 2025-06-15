// comics-productos.component.ts
import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../../services/comic.service';
import { Comic } from '../../../model/comic/comic.model';
import { AuthService } from '../../../services/auth.service.spec';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comics-productos',
  templateUrl: './comics-productos.component.html',
  styleUrls: ['./comics-productos.component.scss'],
  standalone: false
})
export class ComicsProductosComponent implements OnInit {
  isSidebarOpen = false;

  allComics: Comic[] = []; // backup
  comics: Comic[] = [];

  priceRange: number[] = [0, 100];

  tipos: string[] = ['Comic', 'Manga'];
  editoriales: string[] = ['Marvel', 'DC', 'Image', 'IDW', 'Shueshia'];
  generos: string[] = ['Acción', 'Aventura', 'Ciencia ficción', 'Fantasía', 'Superhéroes', 'Terror'];


  selectedTipos: { [key: string]: boolean } = {};
  selectedEditoriales: { [key: string]: boolean } = {};
  selectedGeneros: { [key: string]: boolean } = {};

  constructor(
    private comicService: ComicService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  isFilterOpen = true;

  toggleFilterPanel() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  loadComics(query?: string) {
    this.comicService.getAllComics().subscribe({
      next: (res: any) => {
        let data = (res.comics ?? res.data ?? []) as Comic[];
        this.allComics = data;
        this.comics = data;

        if (query) {
          this.comics = data.filter(comic =>
            comic.title.toLowerCase().includes(query.toLowerCase())
          );
        }


        this.tipos.forEach(t => this.selectedTipos[t] = false);
        this.editoriales.forEach(e => this.selectedEditoriales[e] = false);
        this.generos.forEach(g => this.selectedGeneros[g] = false);


        // Inicializar checkboxes
        this.tipos.forEach(t => this.selectedTipos[t] = false);
        this.editoriales.forEach(e => this.selectedEditoriales[e] = false);
        this.generos.forEach(g => this.selectedGeneros[g] = false);
      },
      error: () => {
        console.log('Error al cargar los cómics.');
      }
    });
  }

  applyFilters() {
    this.comics = this.allComics.filter((comic) => {
      const inPriceRange = comic.price >= this.priceRange[0] && comic.price <= this.priceRange[1];

      const tipoValue = comic.tipo?.toLowerCase() || '';
    const tipoKey = Object.keys(this.selectedTipos).find(k => k.toLowerCase() === tipoValue);
    const tipoOk = Object.values(this.selectedTipos).some(v => v)
      ? !!(tipoKey && this.selectedTipos[tipoKey])
      : true;

    const editorialValue = comic.editorial?.toLowerCase() || '';
    const editorialKey = Object.keys(this.selectedEditoriales).find(k => k.toLowerCase() === editorialValue);
    const editorialOk = Object.values(this.selectedEditoriales).some(v => v)
      ? !!(editorialKey && this.selectedEditoriales[editorialKey])
      : true;

    const generoValue = comic.genero?.toLowerCase() || '';
    const generoKey = Object.keys(this.selectedGeneros).find(k => k.toLowerCase() === generoValue);
    const generoOk = Object.values(this.selectedGeneros).some(v => v)
      ? !!(generoKey && this.selectedGeneros[generoKey])
      : true;

      return inPriceRange && tipoOk && editorialOk && generoOk;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      this.loadComics(query);
    });
  }

  trackById(index: number, comic: Comic) {
    return comic.id;
  }

  handleComicDeleted(deletedId: number) {
    this.comics = this.comics.filter(comic => comic.id !== deletedId);
  }

}
