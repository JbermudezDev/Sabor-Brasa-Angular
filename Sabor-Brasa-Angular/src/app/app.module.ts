import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Landing/header/header.component';
import { InfoLandingComponent } from './components/Landing/info-landing/info-landing.component';
import { FooterComponent } from './components/Landing/footer/footer.component';
import { LandingPagesComponent } from './components/Pages/Landing-page/landing-pages/landing-pages.component';
@NgModule({
  declarations: [
    LandingPagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    HeaderComponent,
    InfoLandingComponent,
    FooterComponent
  ],
  providers: [],
 
})
export class AppModule { }

