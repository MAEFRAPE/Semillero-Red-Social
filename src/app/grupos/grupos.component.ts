import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGrupoComponent } from '../form-grupo/form-grupo.component';
import { Grupos } from '../models/grupos.class';
import { Publicacion } from '../models/publicacion.class';
import { Usuario } from '../models/usuario.class';
import { BuscarService } from '../shared/services/buscar.service';
import { GruposService } from '../shared/services/grupos.service';
import { NotificacionesService } from '../shared/services/notificaciones.service';
import { PostService } from '../shared/services/post.service';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { UsersServicesService } from '../shared/services/users-services.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {
  
  id:number=0
  usuario:Usuario =new Usuario ("","","")
  listaGrupos:Grupos[]=[]
  grupoConsulta:Grupos|undefined= new Grupos("","",0)
  listaMiembros:Usuario[] | undefined=[]
  listaUsuarios:Usuario[]=[]
  listaPublicaciones:Publicacion[]=[]
  listaAlluser:Usuario[]=[]

  constructor(
    public activeRoute : ActivatedRoute,
    private router:Router,
    private storage:SessionStorageService,
    private servicioGrupo:GruposService,
    private modal:NgbModal,
    private servicioUser:UsersServicesService,
    private servicioPosts:PostService,
    private serviciNotifi:NotificacionesService,
    private servicioBuscar:BuscarService
    

  ) { }

  ngOnInit(): void {
    this.consultarUsuario()
    this.consultarGrupos()
    this.consultarUser()
    this.allUser()
    this.consultarPosts()
    this.id= Number (this.activeRoute.snapshot.queryParamMap.get("id"))
    this.servicioPosts.ObtenerSubcripcion().subscribe(elem =>{
      
      
      this.serviciNotifi.notificar(this.listaPublicaciones,elem,this.listaAlluser,this.usuario,this.listaGrupos,this.listaUsuarios)


        

    })
  }


  buscarGrupo(id:number){
    this.grupoConsulta =(this.listaGrupos.find((elem:Grupos) =>{
      return elem.ID===id
      }))
  }

  buscarMiembros(){
    this.listaMiembros=this.grupoConsulta?.users

  }
  consultarUsuario(){
    this.usuario=this.storage.obtenerUsuario()
   }

  cerrarSesion(){
    window.sessionStorage.clear()
    this.router.navigate(["/login"])
  }

  consultarGrupos(){
    this.servicioGrupo.consultarGrupo().subscribe(resGrupo=>{
      this.listaGrupos=resGrupo
      this.buscarGrupo(this.id)
      this.buscarMiembros()
    })
  }

  addGrupo(user_id:number|undefined,group_id:number|undefined){
    this.servicioGrupo.addGrupos(Number(user_id),Number(group_id))
  }

  abrirFormGrupo(){
    const modalRf= this.modal.open(FormGrupoComponent,{backdrop:'static'})
  }
  
  addUsuario(followed_id:number|undefined){

    this.servicioUser.addUser(Number(this.usuario.ID),Number(followed_id))

  }

  consultarUser(){
    this.servicioUser.consultarUser().subscribe(resusu=>{
      this.listaUsuarios=resusu
    })
  }

  seguir(u:Usuario){
    const usurio=this.listaUsuarios.find(elem =>{
      return elem.ID=== u.ID
    })

    if(usurio){
      return true
    }else{
      return false
    }
  }

  allUser(){
    this.servicioBuscar.Buscar("").subscribe(elem =>{
      this.listaAlluser=elem
    })
  }
   
  consultarPosts(){
    this.servicioPosts.consultarPosts().subscribe(respuesta=>{
      
      this.listaPublicaciones=respuesta
      console.log( this.listaPublicaciones)
      
    })
  }
  
}
