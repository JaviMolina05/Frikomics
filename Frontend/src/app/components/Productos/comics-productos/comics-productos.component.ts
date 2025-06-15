// comics-productos.component.ts
import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../../services/comic.service';
import { Comic } from '../../../model/comic/comic.model';
import { AuthService } from '../../../services/auth.service';
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

  currentPage: number = 1;
  itemsPerPage: number = 16;
  pagedComics: Comic[] = [];
  totalPages: number = 1;



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

      if (query) {
        this.comics = data.filter(comic =>
          comic.title.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        this.comics = data;
      }

      // Reiniciar filtros seleccionados
      this.priceRange = [0, 100];

      this.selectedTipos = {};
      this.tipos.forEach(t => this.selectedTipos[t] = false);

      this.selectedEditoriales = {};
      this.editoriales.forEach(e => this.selectedEditoriales[e] = false);

      this.selectedGeneros = {};
      this.generos.forEach(g => this.selectedGeneros[g] = false);

      this.currentPage = 1;  // Reiniciar a primera página

      this.paginateComics(); // Actualizar paginación después de filtrar
    },
    error: () => {
      console.log('Error al cargar los cómics.');
    }
  });
}



  applyFilters() {
    const tiposSeleccionados = Object.entries(this.selectedTipos)
      .filter(([_, selected]) => selected)
      .map(([tipo, _]) => tipo);
    console.log('Tipos seleccionados:', tiposSeleccionados);

    const editorialesSeleccionadas = Object.entries(this.selectedEditoriales)
      .filter(([_, selected]) => selected)
      .map(([editorial, _]) => editorial);
    console.log('Editoriales seleccionadas:', editorialesSeleccionadas);

    const generosSeleccionados = Object.entries(this.selectedGeneros)
      .filter(([_, selected]) => selected)
      .map(([genero, _]) => genero);
    console.log('Géneros seleccionados:', generosSeleccionados);

    this.comics = this.allComics.filter(comic => {
      // Aquí imprime las propiedades para comprobar
      console.log('Comprobando comic:', comic.title, comic.tipo, comic.editorial, comic.genero);

      // Filtrar por tipo
      if (tiposSeleccionados.length > 0 && !tiposSeleccionados.includes(comic.tipo)) {
        return false;
      }
      // Filtrar por editorial
      if (editorialesSeleccionadas.length > 0 && !editorialesSeleccionadas.includes(comic.editorial)) {
        return false;
      }
      // Filtrar por género
      if (generosSeleccionados.length > 0 && !generosSeleccionados.includes(comic.genero)) {
        return false;
      }
      return true;
    });

    this.currentPage = 1;
    this.paginateComics();
  }





  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];

      // Recarga y limpia filtros cada vez que cambia la query
      this.loadComics(query);
    });
  }


  trackById(index: number, comic: Comic) {
    return comic.id;
  }

  handleComicDeleted(deletedId: number) {
    this.comics = this.comics.filter(comic => comic.id !== deletedId);
  }
  
 paginateComics() {
  this.totalPages = Math.max(1, Math.ceil(this.comics.length / this.itemsPerPage));

  // Asegurar currentPage dentro de rango
  if (this.currentPage > this.totalPages) {
    this.currentPage = this.totalPages;
  }
  if (this.currentPage < 1) {
    this.currentPage = 1;
  }

  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;

  this.pagedComics = this.comics.slice(start, end);
}



  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateComics();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateComics();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateComics();
    }
  }

}
