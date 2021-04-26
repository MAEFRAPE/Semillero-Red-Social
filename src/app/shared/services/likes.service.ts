import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/models/publicacion.class';
import { Reaccion } from 'src/app/models/reaccion.class';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  URL=environment.Url_Api

  constructor(
    private http: HttpClient,
    private router: Router

  ) { }

  crearLikes(obj:Reaccion):Promise<any>{
    
    const body={post_id:obj.post_id,user_id:obj.user_id}
    console.log(body)
    
    return new Promise((resolve, reject) => {

        this.http.post<Reaccion>(`${this.URL}/reactions`,JSON.stringify(body)).subscribe(respuesta=>{
        
        resolve(respuesta)
      },error =>{
        console.log(error)
        Swal.fire(
          "Error",
          "Ocurrio un error dando like",
          "error"
        )
        reject(error)
      })
    })
  }
}
