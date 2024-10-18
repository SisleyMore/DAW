import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cita, Sede, Servicio, Turno } from '../models/cita.interface';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url_ss = "http://localhost:8080/citas/servicios";
  url_t = "http://localhost:8080/citas/turnos";
  url_s = "http://localhost:8080/citas/sedes";
  url_post_cita = "http://localhost:8080/citas";

  constructor(private http:HttpClient) { }

  getServicios(){
    let header = new HttpHeaders().set('Type-content', 'application/json');
    return this.http.get<Servicio[]>(this.url_ss,{headers: header});
  }

  postCita = (data:Cita) => {
    return this.http.post<Cita>(this.url_post_cita, data)
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
