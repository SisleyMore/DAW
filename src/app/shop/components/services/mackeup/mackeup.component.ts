import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DialogModule } from 'primeng/dialog';
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
import { ClassCita, ClassSede, ClassServicio, ClassTurno } from '../../../../models/citaClass';
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
    DialogModule,
    NgIf,
    ButtonModule,
    RouterModule,
    FieldsetModule,
    CalendarModule,
    InputTextareaModule,
    RouterModule
  ],
  providers: [DatePipe],
  templateUrl: './mackeup.component.html',
  styleUrl: './mackeup.component.css',
})
export class MackeupComponent {
  private readonly shopService = inject(ServicesService);
  private readonly formBuilder = inject(FormBuilder);
  private datePipe = inject(DatePipe);


  model = new ClassCita();
  services: ClassServicio[] = [];
  turnos: ClassTurno[] = [];
  sedes: ClassSede[] = [];
  errorMessage: string | null = null;

  showSuccessDialog: boolean = false;
  showErrorDialog: boolean = false;

  mensaje = '';
  citaServicio: string = '';
  citaFecha: string = '';
  citaTurno: { turno: string, horario: string} | null = null;
  citaSede: { distrito: string; direccion: string } | null = null;
  minDate: Date;
  constructor(private router:Router) {
    this.minDate = new Date();
  }
  protected readonly appointmentForm = this.formBuilder.group({
    servicio: [0, Validators.required], 
    personalInformation: this.formBuilder.group({
      firstName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    }),
    appointmentInformation: this.formBuilder.group({
      appointmentDate: [, Validators.required],
      turno: [0, Validators.required],
      sede: [0, Validators.required]
    }),
  });

  ngOnInit() {

    this.shopService.getCircuitBreaker().subscribe({
      next: (data) => {
        this.sedes = data;
        this.errorMessage = null;  
      },
      error: (err) => {
        this.errorMessage = 'Temporalmente no disponible';
        console.error('Error en obtener servicios:', err);
      }
    });

    this.shopService.getServicios().subscribe(
      (data) => {
        this.services = data;
      },
      (error) => {
        console.error('Error al cargar los servicios:', error);
      }
    );

    this.shopService.getTurnos().subscribe(
      (turnos: ClassTurno[]) => {
        this.turnos = turnos;
        console.log('Turnos cargadas:', this.turnos);

      },
      (error) => {
        console.error('Error al cargar los turnos:', error);
      }
    );

    this.shopService.getSedes().subscribe(
      (sedes: ClassSede[]) => {
        this.sedes = sedes;
        console.log('Sedes cargadas:', this.sedes);
      },
      (error) => {
        console.error('Error al cargar las sedes:', error);
      }
    );
  }


  agregar = () => {
    if (this.appointmentForm.valid) {
      this.model.servicio.codServicio = this.appointmentForm.value.servicio!;
      this.model.turno.idTurno = this.appointmentForm.value.appointmentInformation?.turno!;
      this.model.sede.idSede = this.appointmentForm.value.appointmentInformation?.sede!;
      
      const personalInfo = this.appointmentForm.value.personalInformation!;
      this.model.nombrePersona = personalInfo.firstName!;
      this.model.numeroTel = personalInfo.phone!;
      this.model.email = personalInfo.email!;
      this.model.descripcion = personalInfo.description!;
      
      const appointmentInfo = this.appointmentForm.value.appointmentInformation!;

      this.model.estado = true;
    
      if (appointmentInfo.appointmentDate) {
        const dateValue: Date = new Date(appointmentInfo.appointmentDate);
        this.model.fechaCita = dateValue;
      } else {
        console.error('Error: appointmentDate es nulo o indefinido.');
        return;
      }

      this.shopService.postCita(this.model).subscribe(
      
        (resp: any) => {
          this.citaServicio = this.services.find(servicio => servicio.codServicio === this.appointmentForm.value.servicio)?.nombreServicio || '';
          this.citaFecha = this.datePipe.transform(this.appointmentForm.get('appointmentInformation.appointmentDate')?.value, 'dd/MM/yyyy') || '';
          this.citaTurno = this.turnos.find(turno => turno.idTurno === this.appointmentForm.get('appointmentInformation.turno')?.value) || null;
          this.citaSede = this.sedes.find(sede => sede.idSede === this.appointmentForm.get('appointmentInformation.sede')?.value) || null;
          
          console.log('Cita registrada exitosamente', resp);
          this.showSuccessDialog = true;
          setTimeout(() => {
            this.router.navigate(['/app/home']); 
          }, 2000);
        },
        (error) => {
          console.error('Error al registrar la cita:', error);
          this.showErrorDialog = true; 
        }
      );
    } else {
      console.log('El formulario no es válido.');
    }
  };
}
