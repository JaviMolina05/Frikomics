import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service.spec';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // Definir la propiedad 'user' para almacenar los datos del formulario
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegisterSubmit() {
    // Validación de contraseñas
    if (this.user.password !== this.user.confirmPassword) {
      alert('Las contraseñas no coinciden. Intenta nuevamente.');
      return;
    }

    // Prepara los datos que realmente envías (no incluyas confirmPassword si el backend no lo requiere)
    const payload = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password
    };

    // Enviar al backend
    this.authService.register(payload).subscribe({
      next: (res) => {
        alert('Registro exitoso');
        this.router.navigate(['/login']); // Redirige al login
      },
      error: (err) => {
        console.error('Error en registro:', err);
        alert('Hubo un error al registrar. Verifica los datos.');
      }
    });
  }
  }

