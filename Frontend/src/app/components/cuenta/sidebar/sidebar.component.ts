import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  logout() {
    // Aquí podrías limpiar el token de localStorage
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
