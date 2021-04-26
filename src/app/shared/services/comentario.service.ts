import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario } from 'src/app/models/comentario.class';
import { Publicacion } from 'src/app/models/publicacion.class';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  URL=environment.Url_Api

  constructor(

    private http: HttpClient,
   
    private router: Router

  ) { }

  crearComentario(obj:Comentario):Promise<any>{
    
    const body={comment:obj.comment,post_id:obj.post_id,user_id:obj.user_id}
    
    
    return new Promise((resolve, reject) => {

        this.http.post<Publicacion>(`${this.URL}/comments`,JSON.stringify(body)).subscribe(respuesta=>{
        
        resolve(respuesta.user_id)
        
      },error =>{
        console.log(error)
        Swal.fire(
          "Error",
          "Ocurrio un error realizando el comentario",
          "error"
        )
        reject(error)
      })
    })
  }
}
