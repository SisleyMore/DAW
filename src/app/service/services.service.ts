import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cita, Sede, Servicio, Turno } from '../models/cita.interface';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url = "http://localhost:8080/servicios";
  url_t = "http://localhost:8080/servicios/turnos"
  url_s = "http://localhost:8080/servicios/sedes"

  constructor(private http:HttpClient) { }

  getServicios(){
    let header = new HttpHeaders().set('Type-content', 'application/json');
    return this.http.get<Servicio[]>(this.url,{headers: header});
  }

  postService = (data:Servicio) => {
    return this.http.post<Servicio>(this.url, data)
    .pipe(map((svc)=>data));
  }

  getTurnos(){
    let header = new HttpHeaders().set('Type-content', 'application/json');
    return this.http.get<Turno[]>(this.url_t,{headers: header});
  }

  getSedes(){
    let header = new HttpHeaders().set('Type-content', 'application/json');
    return this.http.get<Sede[]>(this.url_s,{headers: header});
  }
}
