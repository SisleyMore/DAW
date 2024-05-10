import {Component, input} from '@angular/core';
import {Product} from "../../../models/product.interface";
import {CurrencyPipe} from "@angular/common";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    ButtonModule
  ],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {
  public readonly product= input.required<Product>();
}
