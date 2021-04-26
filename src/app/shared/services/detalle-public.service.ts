import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publicacion } from 'src/app/models/publicacion.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetallePublicService {

  URL= environment.Url_Api

  constructor(
    private http:HttpClient,
  ) { }

  consultarPost(id:number){  

    return this.http.get<Publicacion>(`${this.URL}/posts/${id}`)
  }
}
