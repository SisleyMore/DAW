import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import type { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { ShoppingCartStore } from '../../../+store/shopping-cart.store';
import { CartSidebarComponent } from '../../cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MenuModule,
    MenubarModule,
    ButtonModule,
    StyleClassModule,
    SidebarModule,
    CartSidebarComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly cartStore = inject(ShoppingCartStore);
  public cartCount = this.cartStore.cartCount; /*this.cartStore.cartCount;*/
  public sidebarVisible = signal(false);

  protected readonly userOptions = [
    {
      label: 'Iniciar Sesión',
      icon: 'pi pi-fw pi-pencil',
      routerLink: './login',
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-fw pi-power-off',
    },
  ];

  protected readonly items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: './home',
    },
    {
      label: 'Productos',
      icon: 'pi pi-star',
      routerLink: './products',
    },
    {
      label: 'Servicios',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Reservar',
          icon: 'pi pi-pencil',
          routerLink: './mackeup',
        },
      ],
    },
    {
      label: 'Quiénes somos',
      icon: 'pi pi-envelope',
      routerLink: './about',
    },
  ];  
  constructor(private router: Router) {} // Inyectar Router

  userName: string | null = null;

  ngOnInit() {
    this.userName = localStorage.getItem('userName'); // Obtener el nombre del usuario desde localStorage
  }

  logout() {
    localStorage.removeItem('token'); // Opcional: Eliminar el token al cerrar sesión
    localStorage.removeItem('userName'); // Opcional: Eliminar el nombre del usuario al cerrar sesión
    this.router.navigate(['/login']); // Redirigir a la vista de inicio de sesión
  }

}
