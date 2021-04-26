import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MuroComponent } from './muro/muro.component';
import { RegistroComponent } from './registro/registro.component';
import { routing } from './routes/app_routes';
import { GuardiaLoginService } from './shared/services/guardia-login.service';
import { InterceptorService } from './shared/services/interceptor.service';
import { PerfilComponent } from './perfil/perfil.component';
import { FormularioPublicacionComponent } from './formulario-publicacion/formulario-publicacion.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import{ AngularFireStorageModule} from '@angular/fire/storage';

import { PublicacionComponent } from './publicacion/publicacion.component';
import { FormGrupoComponent } from './form-grupo/form-grupo.component';
import { BuscarComponent } from './buscar/buscar.component';
import { GruposComponent } from './grupos/grupos.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MuroComponent,
    RegistroComponent,
    PerfilComponent,
    FormularioPublicacionComponent,
    PublicacionComponent,
    FormGrupoComponent,
    BuscarComponent,
    GruposComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule, // se importa el servicio htttp
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,

  ],
  providers: [
    GuardiaLoginService,
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
