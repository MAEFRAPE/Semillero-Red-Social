import { Component, OnInit } from '@angular/core';

import { AutenticarService } from '../shared/services/autenticar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario={
    email:"",
    password:""
  }

  constructor(
    
    private servicioAuth:AutenticarService
  ) { }

  ngOnInit(): void {

  }
  login(){


    const {email, password}=this.usuario
    this.servicioAuth.login(email,password).then(user => {
    }).catch(error=>{
      console.log(error)
    })

  }
  

}
