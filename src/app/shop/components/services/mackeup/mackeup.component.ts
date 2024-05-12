import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { filter } from 'rxjs';
import { ClassService } from '../../../../models/serviceClass';
import { ServicesService } from '../../../../service/services.service';

@Component({
  selector: 'app-mackeup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    FormsModule,
    NgIf,
    ButtonModule,
    RouterModule,
    FieldsetModule,
    CalendarModule,
    InputTextareaModule,
    RouterModule
  ],
  templateUrl: './mackeup.component.html',
  styleUrl: './mackeup.component.css',
})
export class MackeupComponent {
  private readonly shopService = inject(ServicesService);
  private readonly formBuilder = inject(FormBuilder);

  mensaje = '';
  model = new ClassService();
  selectedLocation = '1';

  constructor(private router:Router) {
  }
  protected readonly appointmentForm = this.formBuilder.group({
    personalInformation: this.formBuilder.group({
      firstName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    }),
    appointmentInformation: this.formBuilder.group({
      appointmentDate: ['', Validators.required],
      time: ['', Validators.required],
      location: ['1', Validators.required],
      address: [''],
      reference: [''],
    }),
  });

  toggleInputs(event: any) {
    this.selectedLocation = event.target.value;
    console.log(this.selectedLocation);
  }

  selectedServices: FormControl = new FormControl();
  services = [
    { name: 'Manicura', value: 'Manicura'},
    { name: 'Maquillaje', value: 'Maquillaje' },
    { name: 'Asesoramiento', value: 'Asesoramiento' },
  ];

  agregar = () => {
 
    this.shopService.postService(this.model).subscribe((resp: any) => {

    
        this.router.navigate(['/app/home']);
        console.log('exito');
      
    });
  };
}
