import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service.interface';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url = "http://localhost:8080/servicios";
  constructor(private http:HttpClient) { }

  getServicios(){
    let header = new HttpHeaders().set('Type-content', 'application/json');
    return this.http.get<Service[]>(this.url,{headers: header});
  }

  postService = (data:Service) => {
    return this.http.post<Service>(this.url, data)
    .pipe(map((svc)=>data));
  }
}
