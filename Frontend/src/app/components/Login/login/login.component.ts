import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service.spec'; // crea este servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
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
        localStorage.setItem('token', res.token); // guarda el token si usas Sanctum/JWT
        this.router.navigate(['/dashboard']); // o donde sea
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
        alert('Credenciales incorrectas');
      }
    });
  }
}
