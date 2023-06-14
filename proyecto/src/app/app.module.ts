import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { LoginComponent } from './componentes/login/login.component';
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { Header1Component } from './componentes/header1/header1.component';
import { Header2Component } from './componentes/header2/header2.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdusuariosComponent } from './componentes/adusuarios/adusuarios.component';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';
import { InterceptorService } from './interceptor/interceptor.service';
import { HeadermenuComponent } from './componentes/headermenu/headermenu.component';
import { AdmensajesComponent } from './componentes/admensajes/admensajes.component';
import { AdproductosComponent } from './componentes/adproductos/adproductos.component';
import { MenuusuarioComponent } from './componentes/menuusuario/menuusuario.component';
import { UsproductosComponent } from './componentes/usproductos/usproductos.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { SubirarchivosComponent } from './componentes/subirarchivos/subirarchivos.component';
import { UssolicitudesComponent } from './componentes/ussolicitudes/ussolicitudes.component';
import { AdpedidosComponent } from './componentes/adpedidos/adpedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ContactenosComponent,
    NosotrosComponent,
    Header1Component,
    Header2Component,
    AdusuariosComponent,
    MensajesComponent,
    HeadermenuComponent,
    AdmensajesComponent,
    AdproductosComponent,
    MenuusuarioComponent,
    UsproductosComponent,
    PerfilComponent,
    SubirarchivosComponent,
    UssolicitudesComponent,
    AdpedidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
