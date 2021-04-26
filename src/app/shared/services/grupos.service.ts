import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Grupos } from 'src/app/models/grupos.class';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  URL= environment.Url_Api

  constructor(
    private http:HttpClient,
    private router: Router
  ) { }

  consultarGrupo(){  

    return this.http.get<Grupos[]>(`${this.URL}/groups`)
  }

  addGrupos(user_id:number,group_id:number):Promise<any>{
    
    const body={user_id,group_id}
        
    return new Promise((resolve, reject) => {

        this.http.post(`${this.URL}/groups/append`,JSON.stringify(body)).subscribe(respuesta=>{
        
        resolve(respuesta)
      },error =>{
        console.log(error)
        Swal.fire(
          "Error",
          "Ocurrio un error al unirte al grupo",
          "error"
        )
        reject(error)
      })
    })
  }  

  crearGrupo(obj:Grupos):Promise<any>{
    
    const body={name:obj.name,description:obj.description,creator_id:obj.creator_id}
    
    return new Promise((resolve, reject) => {

        this.http.post<Grupos>(`${this.URL}/groups`,JSON.stringify(body)).subscribe(respgr=>{
        
        resolve(respgr.creator_id)
        this.router.navigate(["/muro"])
        
      },error =>{
        console.log(error)
        Swal.fire(
          "Error",
          "Ocurrio un error Creando grupo",
          "error"
        )
        reject(error)
      })
    })
  }
}
