import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comics-admin',
  standalone: false,
  templateUrl: './comics-admin.component.html',
  styleUrl: './comics-admin.component.scss'
})
export class ComicsAdminComponent {
  comic = {
    title: '',
    description: '',
    price: 0,
    stock: 0,
    editorial: '',
    genero: '',
    status: '',
    tipo: ''
  };
  images: File[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  onFileChange(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    this.images = Array.from(event.target.files);
  }
}

  onSubmit() {
  const formData = new FormData();

  // Agrega todos los campos del formulario
  formData.append('title', this.comic.title);
  formData.append('description', this.comic.description);
  formData.append('price', this.comic.price.toString());
  formData.append('stock', this.comic.stock.toString());
  formData.append('editorial', this.comic.editorial);
  formData.append('genero', this.comic.genero);
  formData.append('status', this.comic.status);

  // Agrega las imágenes
  this.images.forEach((file, index) => {
    formData.append('images[]', file); // Laravel espera "images[]" si es múltiple
  });

  // Enviar al backend
  this.http.post('http://localhost:8000/api/comics', formData).subscribe(
    res => console.log('Comic creado', res),
    err => console.error('Error al crear comic', err)
  );
}
}
