import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Importar los componentes que mencionaste
import { HeaderComponent } from './components/Landing/header/header.component';
import { FooterComponent } from './components/Landing/footer/footer.component';
import { InfoLandingComponent } from './components/Landing/info-landing/info-landing.component';
import { LandingPagesComponent } from './components/Pages/Landing-page/landing-pages/landing-pages.component';

export const routes: Routes = [
  // Rutas para los componentes mencionados
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'info-landing', component: InfoLandingComponent },
  { path: 'landing', component: LandingPagesComponent },
  // Ruta por defecto: redirigir a 'landing' si no se especifica ruta
  { path: '', redirectTo: '/landing', pathMatch: 'full' },

  // Ruta comodín (Wildcard): redirige a 'landing' si la ruta no existe
  { path: '**', redirectTo: '/landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
