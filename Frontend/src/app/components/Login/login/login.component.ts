import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service.spec';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.user).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token); 
        this.router.navigate(['/perfil']); 
        alert('Credenciales correctas');
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
        alert('Credenciales incorrectas');
      }
    });
  }
}
