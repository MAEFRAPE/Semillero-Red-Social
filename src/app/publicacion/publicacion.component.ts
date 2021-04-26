import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../models/comentario.class';
import { Publicacion } from '../models/publicacion.class';
import { Reaccion } from '../models/reaccion.class';
import { Usuario } from '../models/usuario.class';
import { ComentarioService } from '../shared/services/comentario.service';
import { DetallePublicService } from '../shared/services/detalle-public.service';
import { LikesService } from '../shared/services/likes.service';
import { PostService } from '../shared/services/post.service';
import { SessionStorageService } from '../shared/services/session-storage.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent implements OnInit {
  usuario:Usuario =new Usuario ("","","")

  id:number=0
  publicacion:Publicacion= new Publicacion("",0,this.usuario)
  newComentario: Comentario= new Comentario(0,"",0)
  comentario:string=""
  contMegusta:number=0
  reaccion:Reaccion = new Reaccion(0,0)
  constructor(

    public activeRoute : ActivatedRoute,
    public storage: SessionStorageService,
    private servicioDetalle:DetallePublicService,
    private serviceComentario:ComentarioService,
    private router:Router,
    private servicioLike: LikesService,
    private servicioPosts:PostService
  ) { }

  ngOnInit(): void {
    this.consultarUsuario()
    this.id= Number (this.activeRoute.snapshot.queryParamMap.get("id"))
    this.consultarPublicacion()
    this.servicioPosts.ObtenerSubcripcion().subscribe(elem =>{
        if (elem.event=== "new::reaction") {

          if (this.publicacion.ID=== elem.reaction.post_id) {
            if (this.publicacion.reactions) {
              this.publicacion.reactions.push(elem.reaction)
            }else{
              this.publicacion.reactions=[elem.reaction]
            }
          }
          return
        } 
        
        if (elem.event=== "remove::reaction") {

            if (!this.publicacion.reactions) {
              return
             }
            const reaccion= this.publicacion.reactions.find(r=>{
              return r.user_id===this.usuario.ID
            })
            if (reaccion) {
              this.publicacion.reactions.splice(this.publicacion.reactions.indexOf(reaccion),1)
            }
        }

        if (elem.event=== "new::comment") {
          if (this.publicacion.ID=== elem.comment.post_id) {
            if (this.publicacion.comments) {
              this.publicacion.comments?.unshift(elem.comment)
            }else {
              this.publicacion.comments= [elem.comment]
            }
            
          }
          return
        }
    })
    
  }
  //// Publicacion
  consultarUsuario(){
    this.usuario=this.storage.obtenerUsuario()
   }

  consultarPublicacion(){
    this.servicioDetalle.consultarPost(this.id).subscribe(elem =>{
      this.publicacion=elem
    })

  }

  //////////comentario////

  crearComentario(id:number|undefined,idUsu:number|undefined){
   if(this.comentario==""){
      return
    }else{
      this.newComentario= new Comentario(Number(id),this.comentario,Number(idUsu))
      this.serviceComentario.crearComentario(this.newComentario)
      this.limpiar()
    }
  }

  eventoInput(evt:any){
      this.comentario= evt.target.value
  }

  limpiar(){
    this.comentario=""
  }
    /////reacciones
 
    contarMegusta(publi:Publicacion){
      if (publi.reactions) {
        this.contMegusta=publi.reactions?.length
        return true
      } 
      return false
    }
  
    darlike(ID:number|undefined){
      this.reaccion=new Reaccion(Number(ID),Number(this.usuario.ID))
      this.servicioLike.crearLikes(this.reaccion)
    }
  
    saberReaccion(obj:Publicacion){
  
       return obj.reactions?.some(reac=>{
        const id= this.usuario.ID
        return reac.user_id=== id
      })
    }
  ///// cerrar sesion///

cerrarSesion(){
  window.sessionStorage.clear()
  this.router.navigate(["/login"])
}

}
