import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { User } from '../../../../models/user.interface';
import { AuthService } from '../../../../service/auth.service';
import { Router } from '@angular/router'; 

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
  msgError: string = '';

  constructor(private authService: AuthService, private router: Router) {} 

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', this.email); 
        this.router.navigate(['/home']); 
      },
      error: (err: any) => {
        this.msgError = 'El usuario o contraseña ingresado es incorrecto.'
      },
    });
  }
}
