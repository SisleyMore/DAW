import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-advices',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './advices.component.html',
  styleUrl: './advices.component.css'
})
export class AdvicesComponent {

}
