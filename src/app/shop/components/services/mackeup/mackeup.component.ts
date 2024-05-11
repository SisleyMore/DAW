import { Component, type OnInit, model } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ClassService } from '../../../../models/serviceClass';
import { ServicesService } from '../../../../service/services.service';

@Component({
  selector: 'app-mackeup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    FloatLabelModule,
    RadioButtonModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './mackeup.component.html',
  styleUrl: './mackeup.component.css',
})
export class MackeupComponent implements OnInit {
  constructor(private service: ServicesService) {}
  mensaje = '';
  model = new ClassService();
  ngOnInit(): void {}

  selectedServices: FormControl = new FormControl();
  services = [
    { name: 'Manicura', value: 1 },
    { name: 'Maquillaje', value: 2 },
    { name: 'Asesoramiento', value: 3 },
  ];

  agregar = () => {
    this.mensaje = 'AGREGANDO';
  };
}
