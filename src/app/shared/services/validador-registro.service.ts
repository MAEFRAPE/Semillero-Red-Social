import { Injectable } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadorRegistroService {

  constructor() { }

  passwordsIguales(nombrePassword:string,nombrePassword2:string){
    return  (formGroup:FormGroup)=>{
      const grup= formGroup.controls.passwords as FormGroup
      const controlPass1= grup.controls[nombrePassword]
      const controlPass2= grup.controls[nombrePassword2]
      if(controlPass1.value=== controlPass2.value){
        controlPass2.setErrors(null)
      }else{
        controlPass2.setErrors({noCoincide:true})
      }
    }
  }

  validacionFormulario(comment:string,image_url:string){
    return  (formGroup:FormGroup)=>{

      const comentario= formGroup.controls[comment]
      const imag= formGroup.controls[image_url]
      
      console.log(Boolean(comentario.value), Boolean(imag.value))
      if(!Boolean(comentario.value) && !Boolean (imag.value)){
        comentario.setErrors({noValido:true})
        
      }else{
        comentario.setErrors(null)
      }
    }
  }
}
