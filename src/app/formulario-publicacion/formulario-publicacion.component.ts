import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Publicacion } from '../models/publicacion.class';
import { Usuario } from '../models/usuario.class';
import { CargarImgService } from '../shared/services/cargar-img.service';
import { CrearPublicacionService } from '../shared/services/crear-publicacion.service';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { ValidadorRegistroService } from '../shared/services/validador-registro.service';

@Component({
  selector: 'app-formulario-publicacion',
  templateUrl: './formulario-publicacion.component.html',
  styleUrls: ['./formulario-publicacion.component.scss']
})
export class FormularioPublicacionComponent implements OnInit {
   form:FormGroup;
   usuario:Usuario=new Usuario ("","","")
   publicacion:Publicacion= new Publicacion("",0,this.usuario)
   evento:any
   imag:string=""

  constructor(
    private formBuilder : FormBuilder,
    private storage: SessionStorageService,
    private servicioPublicacion:CrearPublicacionService,
    private activemodal:NgbActiveModal,
    private cargarImg:CargarImgService,
    private servicioValidador:ValidadorRegistroService

  ) { 

    this.form=this.formBuilder.group({
      comment:[""],
      image_url:[""]
    },{
      validators:this.servicioValidador.validacionFormulario("comment","image_url")
    }
    
    )
  }

  ngOnInit(): void {
    this.obtenerUsuario()
  }

  submit(){
   
      console.log("Aqui viene el estado de publicacion ",this.form.invalid)
      if(this.form.invalid){
        Swal.fire(
          "Error",
          "Formulario Incompleto o revise los datos",
          "error"
        )
        return
      }
      const values=this.form.value;
      const id= Number(this.usuario.ID)
      if (values.image_url=="") {

         this.publicacion= new Publicacion(values.comment,id,this.usuario) 
         this.servicioPublicacion.crearPublicacion(this.publicacion)
         this.activemodal.dismiss();
      } else {      
        this.cargarImg.subir(this.evento)
        setTimeout(() => {
          this.imag=this.cargarImg.getUrl()
          this.publicacion= new Publicacion(values.comment,id,this.usuario,this.imag) 
          this.servicioPublicacion.crearPublicacion(this.publicacion)
         this.activemodal.dismiss();
        }, 3000);

        
      }
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
