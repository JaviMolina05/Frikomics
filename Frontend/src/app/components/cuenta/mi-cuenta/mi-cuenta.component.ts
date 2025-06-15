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
  sidebarVisible = false;
  isMobile = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log("ngOnInit ejecutado");

    this.http.get('http://localhost:8000/api/user').subscribe({
      next: (res: any) => {
        console.log('Respuesta del servidor', res);
        this.perfil.name = res.user.name;
        this.perfil.email = res.user.email;
      },
      error: (err) => {
        console.error('Error en GET /api/user', err);
      }
    });
    this.checkScreen();
    window.addEventListener('resize', () => this.checkScreen());
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

    this.http.put('http://localhost:8000/api/user', data).subscribe({
      next: () => alert('Perfil actualizado correctamente.'),
      error: () => alert('Error al actualizar el perfil.')
    });
  }

  checkScreen() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.sidebarVisible = false;
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebar() {
    this.sidebarVisible = false;
  }
}

