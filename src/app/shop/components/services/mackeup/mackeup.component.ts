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
import { NgIf } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';


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
    NgIf, 
    ButtonModule,
    RouterModule
  ],
  templateUrl: './mackeup.component.html',
  styleUrl: './mackeup.component.css',
})
export class MackeupComponent implements OnInit {
  constructor(private service: ServicesService) {}
  mensaje = '';
  model = new ClassService();
  selectedOption = ''; 
  router = Router;
  ngOnInit(): void {}
  
  toggleInputs(event: any) {
    this.selectedOption = event.target.value;

  }

  selectedServices: FormControl = new FormControl();
  services = [
    { name: 'Manicura', value: 1 },
    { name: 'Maquillaje', value: 2 },
    { name: 'Asesoramiento', value: 3 },
  ];

  agregar = () => {
    this.service.postService(this.model)
    .subscribe(resp =>{
      console.log("exito")
    });
  };
}
