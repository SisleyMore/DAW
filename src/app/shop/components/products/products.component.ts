import { CurrencyPipe, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { productsTemp } from '../../../data/products-temp';
import { Product } from '../../../models/product.interface';
import { Producto } from '../../../models/productClass';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ButtonModule,
    CurrencyPipe,
    TableModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productos: Product[] = [];
  mensaje = 'Modo inserción';
  insUpd = true; // TRUE - INSERTAR -- FALSE - ACTUALIZAR
  model = new Producto();

  constructor(private servicio: ProductService) {}

  ngOnInit(): void {
    // this.getListado();
    this.productos = productsTemp;
  }

  getListado() {
    this.servicio.getProductos().subscribe((resp: any) => {
      // this.productos = resp;
    });
  }

  getProducto(i: Product) {
    this.servicio.getProducto(i.codPro).subscribe((resp: any) => {
      this.mensaje = 'Modo actualización';
      this.model = resp;
      this.insUpd = false;
    });
  }

  delProducto(i: Product) {
    this.servicio.delProductoById(i.codPro).subscribe(() => {
      this.mensaje = 'Producto eliminado';
      this.getListado();
    });
  }

  agregar = () => {
    if (this.insUpd) {
      this.servicio.insertProducto(this.model).subscribe((resp) => {
        this.mensaje = 'Agregado';
        this.getListado();
        this.insUpd = false;
      });
    } else {
      this.servicio.updateProducto(this.model).subscribe(() => {
        this.mensaje = `Producto ${this.model.nombre} actualizado`;
        this.getListado();
        this.insUpd = true;
      });
    }
  };
}
