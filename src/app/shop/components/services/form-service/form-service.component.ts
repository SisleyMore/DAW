import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-form-service',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    FloatLabelModule,
    RadioButtonModule
  ],
  templateUrl: './form-service.component.html',
  styleUrl: './form-service.component.css'
})
export class FormServiceComponent {

}
