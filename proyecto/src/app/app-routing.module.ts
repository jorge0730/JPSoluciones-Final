import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { AdusuariosComponent } from './componentes/adusuarios/adusuarios.component';
import { AdpedidosComponent } from './componentes/adpedidos/adpedidos.component';
import { AdmensajesComponent } from './componentes/admensajes/admensajes.component';
import { AdproductosComponent } from './componentes/adproductos/adproductos.component';
import { MenuusuarioComponent } from './componentes/menuusuario/menuusuario.component';
import { UssolicitudesComponent } from './componentes/ussolicitudes/ussolicitudes.component';
import { UsproductosComponent } from './componentes/usproductos/usproductos.component';
import { SubirarchivosComponent } from './componentes/subirarchivos/subirarchivos.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';

const routes: Routes = [
  {path:"",redirectTo:'/nosotros',pathMatch:"full"},
  {path:"nosotros",component:NosotrosComponent,pathMatch:"full"},
  {path:"login",component:LoginComponent,pathMatch:"full"},
  {path:"contactenos",component:ContactenosComponent,pathMatch:"full"},
  {path:"adusuarios",component:AdusuariosComponent,pathMatch:"full"},
  {path:"adpedidos",component:AdpedidosComponent,pathMatch:"full"},
  {path:"mensajes",component:MensajesComponent,pathMatch:"full"},
  {path:"admensajes",component:AdmensajesComponent,pathMatch:"full"},
  {path:"adproductos",component:AdproductosComponent,pathMatch:"full"},
  {path:"menuusuario",component:MenuusuarioComponent,pathMatch:"full"},
  {path:"usproductos",component:UsproductosComponent,pathMatch:"full"},
  {path:"ussolicitudes",component:UssolicitudesComponent,pathMatch:"full"},
  {path:"subirarchivos",component:SubirarchivosComponent,pathMatch:"full"},
  {path:"perfil",component:PerfilComponent,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
