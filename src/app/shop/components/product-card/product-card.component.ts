import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ShoppingCartStore } from '../../+store/shopping-cart.store';
import type { Product } from '../../../models/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, ButtonModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  public readonly product = input.required<Product>();
  private readonly cartStore = inject(ShoppingCartStore);

  public addToCart() {
    this.cartStore.addToCart(this.product());
  }
}
