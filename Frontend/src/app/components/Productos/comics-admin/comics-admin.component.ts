import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comics-admin',
  standalone: false,
  templateUrl: './comics-admin.component.html',
  styleUrl: './comics-admin.component.css'
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
  formData.append('tipo', this.comic.tipo);

  // Agrega la imagen
  if (this.images[0]) {
  formData.append('image', this.images[0]);
  }

  console.log(localStorage.getItem('token'));

  // Enviar al backend
  this.http.post('http://localhost:8000/api/comics', formData).subscribe(
    res => console.log('Comic creado', res),
    err => console.error('Error al crear comic', err)
  );
}
}
