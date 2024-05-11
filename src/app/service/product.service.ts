import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/productClass';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "http://localhost:8080/producto";

  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get<Producto[]>(this.url);
  }

  getProducto(id: any) {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  insertProducto(data: Producto) {
    return this.http.post<Producto>(this.url, data)
      .pipe(map((emp) => data));
  }

  updateProducto(data: Producto) {
    return this.http.put<Producto>(this.url, data)
      .pipe(map((emp) => data));
  }

  delProductoById(id: any) {
    return this.http.delete<Producto[]>(`${this.url}/${id}`);
  }

}