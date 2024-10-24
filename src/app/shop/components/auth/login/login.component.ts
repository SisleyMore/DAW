import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { User } from '../../../../models/user.interface';
import { AuthService } from '../../../../service/auth.service';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Agrega FormsModule aquí
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = { id: 0, email: '', fullName: '', password: '', createdAt: '', updatedAt: '' };
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Inyectar Router

  // Método para manejar el inicio de sesión
  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', this.email); // Guarda el nombre o email del usuario en localStorage
        this.router.navigate(['/home']); // Redirigir a la vista principal
      },
      error: (err: any) => {
        console.error('Error en el inicio de sesión:', err);
        // Manejo de errores
      },
    });
  }
}
