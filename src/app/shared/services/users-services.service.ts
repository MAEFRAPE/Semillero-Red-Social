import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.class';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {
  URL= environment.Url_Api
  
  constructor(
    private http:HttpClient,
  ) { }

  consultarUser(){  

    return this.http.get<Usuario[]>(`${this.URL}/users`)
  }

  addUser(user_id:number,followed_id:number):Promise<any>{
    
    const body={user_id,followed_id}
    
    
    return new Promise((resolve, reject) => {

        this.http.post(`${this.URL}/users/follow`,JSON.stringify(body)).subscribe(respuesta=>{
        
        resolve(respuesta)
      },error =>{
        console.log(error)
        Swal.fire(
          "Error",
          "Ocurrio un error al seguir a la persona",
          "error"
        )
        reject(error)
      })
    })
  }  
}
