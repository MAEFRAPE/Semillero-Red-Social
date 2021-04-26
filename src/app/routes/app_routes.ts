import { RouterModule, Routes } from "@angular/router";
import { FormularioPublicacionComponent } from "../formulario-publicacion/formulario-publicacion.component";
import { GruposComponent } from "../grupos/grupos.component";
import { LoginComponent } from "../login/login.component";
import { MuroComponent } from "../muro/muro.component";
import { PerfilComponent } from "../perfil/perfil.component";
import { PublicacionComponent } from "../publicacion/publicacion.component";
import { RegistroComponent } from "../registro/registro.component";
import { GuardiaLoginService } from "../shared/services/guardia-login.service";

const appRoutes: Routes=[

    {path: "", component: LoginComponent},
    {path: "muro", component: MuroComponent,canActivate:[GuardiaLoginService]},
    {path: "perfil", component: PerfilComponent,canActivate:[GuardiaLoginService]},
    {path: "publicacion", component: PublicacionComponent,canActivate:[GuardiaLoginService]},
    {path: "grupos", component: GruposComponent,canActivate:[GuardiaLoginService]},
    {path: "registrarUsu", component: RegistroComponent},
    {path: "newPublicacion", component: FormularioPublicacionComponent},
    {path: "**", redirectTo: ""}


];

export const routing= RouterModule.forRoot(appRoutes)