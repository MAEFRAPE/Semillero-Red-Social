import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Paginacion } from 'src/app/models/paginacion.interface';
import { Publicacion } from 'src/app/models/publicacion.class';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  URL= environment.Url_Api
  susbcriPost= new Subject<any>()
  constructor(
    private http:HttpClient,
  ) { }

  consultarPosts(){  

    return this.http.get<Publicacion[]>(`${this.URL}/posts`)
  }

  consultarPostsId(id:number){  

    return this.http.get<Publicacion[]>(`${this.URL}/posts/user/${id}`)
  }

  consultarPostsPaginacion(url:string):Observable<Paginacion>{// se especifica que un observable de resultados(interface)
    return this.http.get<Paginacion>(`${this.URL}${url}`)//es el que envia el llamado http y produce la señal para el observable.
  }

  ObtenerSubcripcion(){
  return this.susbcriPost.asObservable()

  }
}
