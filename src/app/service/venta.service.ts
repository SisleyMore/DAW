import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = 'http://localhost:8080/ventas';  

  constructor(private http: HttpClient) { }

  registrarVenta(venta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, venta);
  }
}
