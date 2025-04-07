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
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }