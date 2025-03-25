import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ComidaListComponent } from './pages/comida/comida-list/comida-list.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'comidas', component: ComidaListComponent },
  { path: 'menu', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
