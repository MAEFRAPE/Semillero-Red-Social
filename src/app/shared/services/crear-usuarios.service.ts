import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario.class';


@Injectable({
  providedIn: 'root'
})
export class CrearUsuariosService {

  URL=environment.Url_Api

  constructor(
    private http: HttpClient,
   
    private router: Router
  ) { }

  crearUsuario(obj:Usuario):Promise<any>{
    const body={name:obj.name,email:obj.email,password:obj.password}
    
    
    return new Promise((resolve, reject) => {

        this.http.post<Usuario>(`${this.URL}/users`,JSON.stringify(body)).subscribe(respuesta=>{
        
        resolve(respuesta.password)
        this.router.navigate(["/login"])
      },error =>{
        console.log(error)
        Swal.fire(
          "Error",
          "Ocurrio un error Creando el usuario",
          "error"
        )
        reject(error)
      })
    })
  }
}
