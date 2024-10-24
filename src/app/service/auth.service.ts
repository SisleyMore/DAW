import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.interface';
import { Producto } from '../models/productClass';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8080/users';
  url_login = "http://localhost:8080/auth/login";

  constructor(private http: HttpClient) {}


  getUsers(){
    let header = new HttpHeaders().set('Type-content', 'application/json');
    return this.http.get<User[]>(this.url,{headers: header});
  }
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email, password }; // Aquí se construye el cuerpo de la solicitud
    return this.http.post<any>(this.url_login, body, { headers });
  }

}
