import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  URL=environment.Url_Api
  token= ""

  constructor(
    private http: HttpClient,
    private storage: SessionStorageService,
    private router: Router
  ) { }

  login(email:string,password:string):Promise<any>{
    const body={email,password}
    const headers={
      "Content-Type": "application/json"

    }
    return new Promise((resolve, reject) => {

        this.http.post< RespuestaLogin>(`${this.URL}/auth`,JSON.stringify(body)).subscribe(respuesta=>{
        this.storage.guardarToken(respuesta.token)
        this.storage.guardarNombreUsuario(respuesta.user.name) 
        this.storage.guardarUsuario(respuesta.user)  
        resolve(respuesta.user)
        this.router.navigate(["/muro"])
      },error =>{
        console.log(error)
        Swal.fire(
          "Error",
          "Ocurrio un error iniciando sesión",
          "error"
        )
        reject(error)
      })
    })
  }
}

interface RespuestaLogin{
  token:string
  user:any
}
