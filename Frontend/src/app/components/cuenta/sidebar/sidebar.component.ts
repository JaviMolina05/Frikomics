import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service.spec';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  logout() {
    // Aquí podrías limpiar el token de localStorage
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
