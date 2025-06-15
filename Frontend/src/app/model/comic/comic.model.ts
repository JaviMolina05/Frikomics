export type TipoComic = 'Comic' | 'Manga';
export type EditorialComic = 'Marvel' | 'DC' | 'Image' | 'IDW' | 'Shueshia';
export type GeneroComic = 'Acción' | 'Aventura' | 'Ciencia ficción' | 'Fantasía' | 'Superhéroes' | 'Terror';

export interface Comic {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  editorial: EditorialComic;
  genero: GeneroComic;
  tipo: TipoComic;
  status: string;
}
