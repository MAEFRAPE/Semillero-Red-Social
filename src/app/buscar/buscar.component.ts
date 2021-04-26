import { Component, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../models/usuario.class';
import { BuscarService } from '../shared/services/buscar.service';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { UsersServicesService } from '../shared/services/users-services.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  @Input() busqueda:string =""
  @Input()listaUsuarios:Usuario[]=[]
  listaUsuariosAll:Usuario[]=[]
  usuario:Usuario =new Usuario ("","","")
  constructor(
    private servicioBuscar: BuscarService,
    private servicioUser:UsersServicesService,
    private servicioStorage:SessionStorageService
    

  ) { }

  ngOnInit(): void {
    this.getUsuario()
    this.buscar()
  }

  buscar(){
    
    this.servicioBuscar.Buscar(this.busqueda).subscribe(elem =>{
      this.listaUsuariosAll=elem
    })
  }

  getUsuario(){
    
   this.usuario= this.servicioStorage.obtenerUsuario()
  }
  addUsuario(followed_id:number|undefined){

    this.servicioUser.addUser(Number(this.usuario.ID),Number(followed_id))

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

}
