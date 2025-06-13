import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-mi-cuenta',
  standalone: false,
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.scss',
})
export class MiCuentaComponent {
  perfil = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  console.log("ngOnInit ejecutado");

  this.http.get('/api/user').subscribe({
    next: (res: any) => {
      console.log('Respuesta del servidor', res);
      this.perfil.name = res.data.user.name;
      this.perfil.email = res.data.user.email;
    },
    error: (err) => {
      console.error('Error en GET /api/user', err);
    }
  });
}


  onSubmit() {
    const data: any = {
      name: this.perfil.name,
      email: this.perfil.email
    };

    if (this.perfil.password && this.perfil.password_confirmation) {
      data.password = this.perfil.password;
      data.password_confirmation = this.perfil.password_confirmation;
    }

    this.http.put('/api/user', data).subscribe({
      next: () => alert('Perfil actualizado correctamente.'),
      error: () => alert('Error al actualizar el perfil.')
    });
  }
}

