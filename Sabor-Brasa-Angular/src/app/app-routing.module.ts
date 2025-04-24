import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AgregarProductoComponent } from './components/productos/agregar/agregar.component';
import { EditarProductoComponent } from './components/productos/editar/editar.component';
import { ListarProductosComponent} from './components/productos/listar/listar.component';
import { ListarComponent } from './components/clientes/listar/listar.component';
import { AgregarComponent } from './components/clientes/agregar/agregar.component';
import { EditarComponent } from './components/clientes/editar/editar.component';
import { DetalleComponent } from './components/clientes/detalle/detalle.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AgregarAdicionalComponent } from './components/adicionales/agregar/agregar.component';
import { ListarAdicionalComponent } from './components/adicionales/listar/listar.component';
import { EditarAdicionalComponent } from './components/adicionales/editar/editar.component';
import { DetalleAdicionalComponent } from './components/adicionales/detalle/detalle.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { DetalleProductosComponent } from './components/productos/detalle/detalle.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { LoginComponent } from './components/login/login.component';
import { LoginClienteComponent } from './components/login-cliente/login-cliente.component';
import { InfoClienteComponent } from './components/Landing-cliente/info-cliente/info-cliente.component';
import { ListarOperadorComponent } from './components/operador/listar/listar.component';
import { AgregarOperadorComponent } from './components/operador/agregar/agregar.component';
import { EditarOperadorComponent } from './components/operador/editar/editar.component';
import { DetalleOperadorComponent } from './components/operador/detalle/detalle.component';
import { InfoPlatoComponent } from './pages/info-plato/info-plato.component';
import { LoginOperadorComponent } from './components/login-operador/login-operador.component'; 
import { DireccionComponent } from './pages/direccion/direccion.component';
import { CarritoIconComponent } from './components/shared/carrito-icon/carrito-icon.component'; 




const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'productos', component: ListarProductosComponent },
  { path: 'productos/agregar', component: AgregarProductoComponent },
  { path: 'productos/editar/:id', component: EditarProductoComponent },
  { path: 'clientes', component: ListarComponent },
  { path: 'clientes/agregar', component: AgregarComponent },
  { path: 'clientes/editar/:id', component: EditarComponent },
  { path: 'clientes/detalle/:id', component: DetalleComponent },
  { path: 'adicionales/agregar', component: AgregarAdicionalComponent },
  { path: 'adicionales', component: ListarAdicionalComponent },
  { path: 'adicionales/editar/:id', component: EditarAdicionalComponent },
  { path: 'adicionales/detalle/:id', component: DetalleAdicionalComponent },
  { path: 'productos/detalle/:id', component: DetalleProductosComponent },
  { path: 'administrador', component: AdministradorComponent },
  {path: 'login', component: LoginComponent},
  {path: 'login-cliente', component: LoginClienteComponent},
  {path: 'info-cliente', component: InfoClienteComponent},
  {path: 'operadores', component: ListarOperadorComponent},
  {path: 'operadores/agregar', component: AgregarOperadorComponent},
  {path: 'operadores/editar/:id', component: EditarOperadorComponent},
  {path: 'operadores/detalle/:id', component: DetalleOperadorComponent},
  {path: 'info-plato', component: InfoPlatoComponent},
  { path: 'info-plato/:id', component: InfoPlatoComponent },
  { path: 'login-operador', component: LoginOperadorComponent },
  { path: 'direccion', component: DireccionComponent },
  { path: 'carrito-icon', component: CarritoIconComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
