import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadorRegistroService } from '../shared/services/validador-registro.service';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.class';
import { CrearUsuariosService } from '../shared/services/crear-usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  form:FormGroup;
   usuario= new Usuario ("","","")
  
  constructor(
    private formBuilder:FormBuilder,
    private  servicioValidador: ValidadorRegistroService,
    private servicioCrearUsuario:CrearUsuariosService
  ) {

    this.form=this.formBuilder.group({
      nombre:["",[Validators.required,Validators.minLength(3)]],
      email:["",[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      passwords:this.formBuilder.group({
          password: ["",[Validators.required,Validators.minLength(6)]],
          password2: ["",[Validators.required,Validators.minLength(6)]],
        })
    },{
      Validators:this.servicioValidador.passwordsIguales("password","password2")
    })
  }

  ngOnInit(): void {


  }
  guardar(){
    
    if(this.form.invalid){
      Swal.fire(
        "Error",
        "Formulario Incompleto o revise los datos",
        "error"
      )
      return
    }
    const values=this.form.value;
     this.usuario= new Usuario(values.nombre,values.email,values.passwords.password2) 
     this.servicioCrearUsuario.crearUsuario(this.usuario)
    Swal.fire(
      "Guardado Correctamente",
      "El usuario ha sido creado correctamente",
      "success"
    )
  }

 get pass2Novalida(){
    
    const group=this.form.controls.passwords as FormGroup
    const pass= group.controls.password?.value
    const pass2= group.controls.password2?.value
    return Boolean(pass) && Boolean(pass2) && pass != pass2

  }


  get miniCaracteres(){
    const group=this.form.controls.passwords as FormGroup
    const pass= group.controls.password?.status
    const touche  =group.controls.password?.touched
    return Boolean!(pass=="INVALID" && touche)

  }
  

}
