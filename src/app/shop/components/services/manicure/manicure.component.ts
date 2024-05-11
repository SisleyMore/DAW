import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-manicure',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './manicure.component.html',
  styleUrl: './manicure.component.css'
})
export class ManicureComponent {

}
