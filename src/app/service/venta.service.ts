import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registrarVenta(venta: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ventas/registro`, venta);
  }
}
