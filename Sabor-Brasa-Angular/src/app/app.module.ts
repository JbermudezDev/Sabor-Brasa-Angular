import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
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

// Componentes de Adicionales
import { AgregarAdicionalComponent } from './components/adicionales/agregar/agregar.component';
import { EditarAdicionalComponent } from './components/adicionales/editar/editar.component';
import { ListarAdicionalesComponent } from './components/adicionales/listar/listar.component';
import { DetalleAdicionalComponent } from './components/adicionales/detalle/detalle.component';

// Componentes Standalone
import { LandingComponent } from './pages/landing/landing.component';
import { HeaderComponent } from './components/Landing-Page/header/header.component';
import { FooterComponent } from './components/Landing-Page/footer/footer.component';
import { InfoLandingComponent } from './components/Landing-Page/info-landing/info-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarProductosComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    ListarComponent,
    AgregarComponent,
    EditarComponent,
    DetalleComponent,
    // Componentes de Adicionales
    AgregarAdicionalComponent,
    EditarAdicionalComponent,
    ListarAdicionalesComponent,
    AppComponent,
    MenuComponent,
    DetalleAdicionalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    // Componentes Standalone importados
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    InfoLandingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
