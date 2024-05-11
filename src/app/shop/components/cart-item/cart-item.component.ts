import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ShoppingCartStore } from '../../+store/shopping-cart.store';
import type { CartItem } from '../../../models/cart-item.interface';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe, InputNumberModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  private readonly cartStore = inject(ShoppingCartStore);
  public cartItem = input.required<CartItem>();

  onQuantityChanged(quantity: number) {
    this.cartStore.updateQuantity(this.cartItem(), quantity);
  }
}
