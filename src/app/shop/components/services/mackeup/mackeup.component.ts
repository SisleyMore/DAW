import { Component, OnInit, model } from '@angular/core';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ServicesService } from '../../../../service/services.service';
import { ClassService } from '../../../../models/serviceClass';

@Component({
  selector: 'app-mackeup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    FloatLabelModule,
    RadioButtonModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './mackeup.component.html',
  styleUrl: './mackeup.component.css'
})
export class MackeupComponent implements OnInit{
  constructor(private service: ServicesService) { };
  mensaje: String = "";
  model = new ClassService();
  ngOnInit(): void {
    
  }

  selectedServices: FormControl = new FormControl(); 
  services = [
    { name: 'Manicura', value: 1 },
    { name: 'Maquillaje', value: 2 },
    { name: 'Asesoramiento', value: 3 },
  ];

  agregar = () => {
    this.mensaje="AGREGANDO";
  }
}
