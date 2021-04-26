import { style } from '@angular/animations';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from 'src/app/shared/services/post.service';
import Swal from 'sweetalert2';
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
import { SessionStorageService } from '../shared/services/session-storage.service';
import { UsersServicesService } from '../shared/services/users-services.service';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.scss']
})
export class MuroComponent implements OnInit {
  limite = 10;
  urlinicial=`/posts?limit=${this.limite}&offset=0`
  listaPublicaciones:Publicacion[]=[]

  listaUsuarios:Usuario[]=[]
  usuario:Usuario =new Usuario ("","","")

  comentario:string=""
  newComentario: Comentario= new Comentario(0,"",0)

  contMegusta:number=0
  reaccion:Reaccion = new Reaccion(0,0)

  listaGrupos:Grupos[]=[]

  busqueda:string=""
  estado:Boolean=false

  listaAlluser:Usuario[]=[]
  constructor(
    private servicioPosts:PostService,
    private storage:SessionStorageService,
    private servicioUser:UsersServicesService,
    private router:Router,
    private modal:NgbModal,
    private serviceComentario:ComentarioService,
    private servicioLike: LikesService,
    private servicioGrupo:GruposService,
    private servicioBuscar: BuscarService,
    private serviciNotifi:NotificacionesService

    

  ) { }

  ngOnInit(): void {
    /* this.consultarPosts() */
    this.paginarPublicacion(this.urlinicial)
    this.consultarNombre()
    this.consultarUser()
    this.consultarGrupos()
    this.allUser()
    this.servicioPosts.ObtenerSubcripcion().subscribe(elem =>{
      
      
      this.serviciNotifi.notificar(this.listaPublicaciones,elem,this.listaAlluser,this.usuario,this.listaGrupos,this.listaUsuarios)


        

    })
  } // fin oninit


  
  //// Publicaciones////

  paginarPublicacion(url:string) {
    this.servicioPosts.consultarPostsPaginacion(url).subscribe( 
    resultados =>{ 

      if (resultados!=null) {
        this.listaPublicaciones=[...this.listaPublicaciones,...resultados.results];
      
      if (Boolean(resultados.next)) {
        this.paginarPublicacion(resultados.next);
      }

    }
    })
}

  /* consultarPosts(){
    this.servicioPosts.consultarPosts().subscribe(respuesta=>{
      
      this.listaPublicaciones=respuesta
      console.log( this.listaPublicaciones)
      
    })
  } */

  

  abrirForm(){
    const modalRf= this.modal.open(FormularioPublicacionComponent,{backdrop:'static'})
  }

 

  ///// Usuarios/////

  consultarUser(){
    this.servicioUser.consultarUser().subscribe(resusu=>{
      this.listaUsuarios=resusu
    })
  }

  consultarNombre(){
    this.usuario=this.storage.obtenerUsuario()
  }

  
//// Comentarios

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
     return obj.reactions?.some(reaci=>{
      const id= this.usuario.ID
      return reaci.user_id=== id
    })
  }

  //////// Grupos/////

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

///busqueda///

  eventoInputBusqueda(evt:any){
    this.busqueda= evt.target.value
    if (this.busqueda=="") {
      this.estado=false
    }
  }



  enviarBusqueda(estado:Boolean){
  this.estado=estado
  }

  allUser(){
    this.servicioBuscar.Buscar("").subscribe(elem =>{
      this.listaAlluser=elem
    })
  }
}

