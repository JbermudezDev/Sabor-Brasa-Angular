import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HeaderComponent } from './components/Landing-Page/header/header.component';
import { FooterComponent } from './components/Landing-Page/footer/footer.component';
import { InfoLandingComponent } from './components/Landing-Page/info-landing/info-landing.component';
import { ListarProductosComponent } from './components/productos/listar/listar.component'; 
import { AgregarProductoComponent } from './components/productos/agregar/agregar.component';
import { EditarProductoComponent } from './components/productos/editar/editar.component';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListarComponent } from './components/clientes/listar/listar.component';
import { AgregarComponent } from './components/clientes/agregar/agregar.component';
import { EditarComponent } from './components/clientes/editar/editar.component';
import { DetalleComponent } from './components/clientes/detalle/detalle.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ListarAdicionalComponent } from './components/adicionales/listar/listar.component';
import { DetalleAdicionalComponent } from './components/adicionales/detalle/detalle.component';
import { AgregarAdicionalComponent } from './components/adicionales/agregar/agregar.component';
import { EditarAdicionalComponent } from './components/adicionales/editar/editar.component';
import { CurrencyPipe } from '@angular/common';
import { DetalleProductosComponent } from './components/productos/detalle/detalle.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { LoginComponent } from './components/login/login.component';
import { LoginClienteComponent } from './components/login-cliente/login-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListarProductosComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    ListarComponent,
    AgregarComponent,
    EditarComponent,
    DetalleComponent,
    ListarAdicionalComponent,
    DetalleAdicionalComponent,
    AgregarAdicionalComponent,
    EditarAdicionalComponent,
    DetalleProductosComponent,
    AdministradorComponent,
    LoginComponent,
    LoginClienteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    InfoLandingComponent,
    FormsModule,
    RouterModule,
    HttpClientModule
    
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
  
})
export class AppModule { }