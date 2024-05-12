import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.interface';
import { Producto } from '../models/productClass';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) {}

  readonly #products$ = this.http.get<Product[]>(`${this.url}`);
  readonly products = toSignal(this.#products$, {
    initialValue: [] as Product[],
  });

  getProducts() {
    return this.http.get<Product[]>(`${this.url}`);
  }

  getProducto(id: number) {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  insertProducto(data: Product) {
    return this.http.post<Producto>(this.url, data);
  }

  updateProducto(data: Product) {
    return this.http.put<Producto>(`${this.url}`, data);
  }

  delProductoById(id: number) {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }
}
