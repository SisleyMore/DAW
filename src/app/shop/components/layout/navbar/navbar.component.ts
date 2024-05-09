import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MenuModule} from "primeng/menu";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {StyleClassModule} from "primeng/styleclass";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MenuModule, MenubarModule, ButtonModule, StyleClassModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected readonly userOptions = [
    {
      label: 'Iniciar Sesión',
      icon: 'pi pi-fw pi-pencil',
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-fw pi-power-off',
    },
  ]

  protected readonly items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: './home',
    },
    {
      label: 'Productos',
      icon: 'pi pi-star'
    },
    {
      label: 'Servicios',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Manicure',
          icon: 'pi pi-bolt'
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server'
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil'
        },
        {
          label: 'Templates',
          icon: 'pi pi-palette',
          items: [
            {
              label: 'Apollo',
              icon: 'pi pi-palette'
            },
            {
              label: 'Ultima',
              icon: 'pi pi-palette'
            }
          ]
        }
      ]
    },
    {
      label: 'Quiénes somos',
      icon: 'pi pi-envelope',
      routerLink: './about'
    }
  ]
}
