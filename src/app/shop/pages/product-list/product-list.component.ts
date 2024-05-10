import { Component } from '@angular/core';
import {DividerModule} from "primeng/divider";
import {productsTemp} from "../../../data/products-temp";
import {Product} from "../../../models/product.interface";
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {SelectItem} from "primeng/api";
import {FormsModule} from "@angular/forms";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    DividerModule,
    ProductCardComponent,
    DataViewModule,
    DropdownModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
  templateUrl: './product-list.component.html',
  styles: `
  `
})
export class ProductListComponent {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  products: Product[] = productsTemp;
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Del más caro al más barato', value: '!precio' },
      { label: 'Del más barato al más caro', value: 'precio' }
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
      console.log(this.sortField);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
      console.log(this.sortField);
    }
  }
}
