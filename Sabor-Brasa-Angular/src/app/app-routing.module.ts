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

//Rutas para adicionales

import { ListarAdicionalesComponent } from './components/adicionales/listar/listar.component';
import { AgregarAdicionalComponent } from './components/adicionales/agregar/agregar.component';
import { EditarAdicionalComponent } from './components/adicionales/editar/editar.component';
import { DetalleAdicionalComponent } from './components/adicionales/detalle/detalle.component';




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
  
  // Rutas para Adicionales
  { path: 'adicionales/all', component: ListarAdicionalesComponent },
  { path: 'adicionales/agregar', component: AgregarAdicionalComponent },
  { path: 'adicionales/editar/:id', component: EditarAdicionalComponent },
  { path: 'adicionales/ver/:id', component: DetalleAdicionalComponent },
  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
