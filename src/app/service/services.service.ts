import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url = "http://localhost:8080/servicios";
  constructor(private http:HttpClient) { }

  
}
