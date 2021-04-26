import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.class';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  

  constructor() { }

  guardarToken(token:string){
    window.sessionStorage.setItem("app-posts-token",token)
  }
  obtenerToken():string | null {

    return window.sessionStorage.getItem("app-posts-token")
  }
  guardarNombreUsuario(nombre:string){
    window.sessionStorage.setItem("app-posts-usuario", nombre)
  }
  obtenerNombreUsuario():string  {

    return window.sessionStorage.getItem("app-posts-usuario") || ""
  }

  guardarUsuario(obj:Usuario){
    window.sessionStorage.setItem("app-posts-usuario-Objeto", JSON.stringify(obj))
  }

  obtenerUsuario():Usuario | any {
    const usuarioJson=window.sessionStorage.getItem("app-posts-usuario-Objeto") ||""
    if (!Boolean(usuarioJson)) {
      return null
      
    }
    return JSON.parse(usuarioJson)
  }

}
