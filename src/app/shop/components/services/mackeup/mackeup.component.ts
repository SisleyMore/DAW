import { NgIf } from '@angular/common';
import { Component, type OnInit, inject, model } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
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
    NgIf,
    ButtonModule,
    RouterModule,
    FieldsetModule,
    DividerModule,
    CalendarModule,
  ],
  templateUrl: './mackeup.component.html',
  styleUrl: './mackeup.component.css',
})
export class MackeupComponent {
  private readonly shopService = inject(ServicesService);
  private readonly formBuilder = inject(FormBuilder);

  mensaje = '';
  model = new ClassService();
  selectedOption = '';
  router = Router;

  protected readonly appointmentForm: FormGroup = this.formBuilder.group({
    personalInformation: this.formBuilder.group({
      firstName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    }),
    appointmentInformation: this.formBuilder.group({
      appointmentDate: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      address: [''],
      reference: [''],
    }),
  });

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
    this.shopService.postService(this.model).subscribe((resp: any) => {
      console.log('exito');
    });
  };
}
