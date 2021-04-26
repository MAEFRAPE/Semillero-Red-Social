import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGrupoComponent } from '../form-grupo/form-grupo.component';
import { FormularioPublicacionComponent } from '../formulario-publicacion/formulario-publicacion.component';
import { Comentario } from '../models/comentario.class';
import { Grupos } from '../models/grupos.class';
import { Publicacion } from '../models/publicacion.class';
import { Reaccion } from '../models/reaccion.class';
import { Usuario } from '../models/usuario.class';
import { BuscarService } from '../shared/services/buscar.service';
import { ComentarioService } from '../shared/services/comentario.service';
import { GruposService } from '../shared/services/grupos.service';
import { LikesService } from '../shared/services/likes.service';
import { NotificacionesService } from '../shared/services/notificaciones.service';
import { PostService } from '../shared/services/post.service';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { UsersServicesService } from '../shared/services/users-services.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  
  listaUsuarios:Usuario[]=[]
  listaUsuarioSer:Usuario[]=[]
  usuario:Usuario =new Usuario ("","","")

  comentario:string=""
  newComentario: Comentario= new Comentario(0,"",0)

  contMegusta:number=0
  reaccion:Reaccion = new Reaccion(0,0)

  listaGrupos:Grupos[]=[]
  listaPublicaciones:Publicacion[]=[]
  listaPublicacionesId:Publicacion[]=[]
  usuarioConsulta:Usuario |undefined =new Usuario ("","","")
  id:number=0 
  busqueda:string=""
  estado:Boolean=false
  constructor(

    private servicioPosts:PostService,
    private storage:SessionStorageService,
    private servicioUser:UsersServicesService,
    private modal:NgbModal,
    private servicioLike: LikesService,
    private serviceComentario:ComentarioService,
    private servicioGrupo:GruposService,
    private activeRoute : ActivatedRoute,
    private router:Router,
    private servicioBuscar:BuscarService,
    private serviciNotifi:NotificacionesService
   
  ) {  }

  ngOnInit(): void {
    this.id= Number (this.activeRoute.snapshot.queryParamMap.get("id"))
    this.llenarlistaUsu()
    this.consultarPosts()
    this.consultarPostsId()
    this.consultarNombre()
    this.consultarGrupos()
    this.consultarUser()
    this.servicioPosts.ObtenerSubcripcion().subscribe(elem =>{
      
      
      this.serviciNotifi.notificar(this.listaPublicaciones,elem,this.listaUsuarios,this.usuario,this.listaGrupos,this.listaUsuarioSer)


        

    })
  } //fin

   ///// Publicacion

   consultarPosts(){
    this.servicioPosts.consultarPosts().subscribe(respuesta=>{
      
      this.listaPublicaciones=respuesta
      
      
    })
  } 
  consultarPostsId(){
    this.servicioPosts.consultarPostsId(this.id).subscribe((respuesta:any)=>{
      this.listaPublicacionesId=respuesta
    })
  }

  abrirForm(){
    const modalRf= this.modal.open(FormularioPublicacionComponent,{backdrop:'static'})
  }

  consultarNombre(){
    this.usuario=this.storage.obtenerUsuario()
   
  }

  consultarUser(){

    this.servicioBuscar.Buscar("").subscribe((respuesta:any)=>{
      this.listaUsuarios=respuesta
      this.buscarUsuario(this.id)
    })
    
  }
  buscarUsuario(id:number){
    if (id=== this.usuario.ID) {
       this.usuarioConsulta= this.usuario
    }else{
      this.usuarioConsulta =(this.listaUsuarios.find((elem:Usuario) =>{
      return elem.ID===id
      }))
    }
 
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

  //// comentarios
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

  //// Grupos///

  consultarGrupos(){
    this.servicioGrupo.consultarGrupo().subscribe(resGrupo=>{
      
      this.listaGrupos=resGrupo
      
    })
  }

  addGrupo(user_id:number|undefined,group_id:number|undefined){
  
    this.servicioGrupo.addGrupos(Number(user_id),Number(group_id))

  }

  abrirFormGrupo(){
    const modalRf= this.modal.open(FormGrupoComponent,{backdrop:'static'})

  }

  
///// cerrar sesion///

cerrarSesion(){

  window.sessionStorage.clear()
  this.router.navigate(["/login"])

}

 //// adicionar usuario

 addUsuario(followed_id:number|undefined){

  this.servicioUser.addUser(Number(this.usuario.ID),Number(followed_id))

  
}
llenarlistaUsu(){

  this.servicioUser.consultarUser().subscribe(elem =>{
    this.listaUsuarioSer=elem
  })
}

//busqueda///

eventoInputBusqueda(evt:any){
  this.busqueda= evt.target.value

  if (this.busqueda=="") {
    this.estado=false
  }
   
}


enviarBusqueda(estado:Boolean){

this.estado=estado
}

}
