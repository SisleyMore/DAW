import { CurrencyPipe } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { ShoppingCartStore } from '../../+store/shopping-cart.store';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    CurrencyPipe,
    DividerModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css',
})
export class CartSidebarComponent {
  private readonly cartStore = inject(ShoppingCartStore);

  public cartItems = this.cartStore.cartItems;
  public cartTotal = this.cartStore.total;
  public sidebarVisible = model.required<boolean>();
}
