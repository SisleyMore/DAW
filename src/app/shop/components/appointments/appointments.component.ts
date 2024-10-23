import { CurrencyPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import {
  Component,
  DestroyRef,
  type Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Cita } from '../../../models/cita.interface';
import { ClassCita, ClassSede } from '../../../models/citaClass';
import { ServicesService } from '../../../service/services.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    NgForOf,
    ButtonModule,
    CurrencyPipe,
    TableModule,
    InputTextModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    NgClass,
    NgIf,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {
  citasDialog: WritableSignal<boolean> = signal(false);
  readonly messageService = inject(MessageService);
  readonly confirmationService = inject(ConfirmationService);
  readonly serviceService = inject(ServicesService);
  items: MenuItem[] | undefined;
  citas!: Cita[];
  sedes: ClassSede[] = [];
  cita!: Cita;
  errorMessage: string | null = null;
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/admin',
      },
      {
        label: 'Citas',
        icon: 'pi pi-envelope',
        badge: '3',
        routerLink: '/app/appointments'
      },
    ];

    this.serviceService
      .getCitas()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((citas) => {
        this.citas = citas;
      });

      this.serviceService.getCircuitBreaker().subscribe({
        next: (data) => {
          this.sedes = data;
          this.errorMessage = null;  
        },
        error: (err) => {
          this.errorMessage = 'Temporalmente no disponible';
          console.error('Error en obtener servicios:', err);
        }
      });
  }

  public openDescripcion(citaSeleccionada: Cita): void {
    this.cita = citaSeleccionada; 
    this.citasDialog.set(true);   
  }

  
}

