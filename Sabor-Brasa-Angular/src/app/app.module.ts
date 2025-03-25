import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HeaderComponent } from './components/Landing-Page/header/header.component';
import { FooterComponent } from './components/Landing-Page/footer/footer.component';
import { InfoLandingComponent } from './components/Landing-Page/info-landing/info-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    InfoLandingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
