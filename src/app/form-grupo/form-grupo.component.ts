import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Grupos } from '../models/grupos.class';
import { Usuario } from '../models/usuario.class';
import { GruposService } from '../shared/services/grupos.service';
import { SessionStorageService } from '../shared/services/session-storage.service';

@Component({
  selector: 'app-form-grupo',
  templateUrl: './form-grupo.component.html',
  styleUrls: ['./form-grupo.component.scss']
})
export class FormGrupoComponent implements OnInit {

  form:FormGroup;
  usuario:Usuario=new Usuario ("","","")
  grupo:Grupos= new Grupos("","",0)
  evento:any
 

  constructor(
    private formBuilder : FormBuilder,
    private storage: SessionStorageService,
    private activemodal:NgbActiveModal,
    private servicioGrupo:GruposService
    
  ) { 

    this.form=this.formBuilder.group({
      name:["",[Validators.required,Validators.minLength(1)]],
      description:["",[Validators.required,Validators.minLength(1)]]
    }
    
    )

  }

  ngOnInit(): void {
    this.obtenerUsuario()
    
  }

  submit(){
   
    
    if(this.form.invalid){
      Swal.fire(
        "Error",
        "Formulario Incompleto ",
        "error"
      )
      return
    }
    
    const values=this.form.value;
    const id= Number(this.usuario.ID)
    this.grupo= new Grupos(values.name,values.description,id)
    this.servicioGrupo.crearGrupo(this.grupo)
       this.activemodal.dismiss();
       Swal.fire(
        "Creado Correctamente",
        "El grupo se creo correctamente",
        "success"
      )
    }



  obtenerUsuario(){
    this.usuario=this.storage.obtenerUsuario()
  }

  cerrar(){
    this.activemodal.dismiss();
  }

  subir(evt:any){
    this.evento=evt
  }

}
