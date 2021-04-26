import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/models/publicacion.class';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CrearPublicacionService {

  URL=environment.Url_Api

  constructor(
    private http: HttpClient,
   
    private router: Router
  ) { }

  crearPublicacion(obj:Publicacion):Promise<any>{
    
    const body={posted_text:obj.posted_text,image_url:obj.image_url,user_id:obj.user_id,user:obj.user}
    
    
    return new Promise((resolve, reject) => {

        this.http.post<Publicacion>(`${this.URL}/posts`,JSON.stringify(body)).subscribe(respuesta=>{
        
        resolve(respuesta.user_id)
        this.router.navigate(["/muro"])
      },error =>{
        console.log(error)
        Swal.fire(
          "Error",
          "Ocurrio un error al intentar crear la publicacion",
          "error"
        )
        reject(error)
      })
    })
  }
}
