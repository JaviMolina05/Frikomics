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
      const token = res?.data?.accessToken;
      const user = res?.data?.user;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        alert('Credenciales correctas');
        this.router.navigate(['/perfil']);
      } else {
        alert('Respuesta inválida del servidor');
      }
    },
    error: (err) => {
      console.error('Error al iniciar sesión', err);
      alert('Credenciales incorrectas');
    }
  });
}

}
