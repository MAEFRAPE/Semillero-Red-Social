import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  URL= environment.Url_Api
  

  constructor(
    private http:HttpClient,

  ) { }

  Buscar(busqueda:string){  

    return this.http.get<Usuario[]>(`${this.URL}/search?text=${busqueda}`)
  }
}
