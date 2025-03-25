import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/Landing/header/header.component";
import { FooterComponent } from "./components/Landing/footer/footer.component";
import { InfoLandingComponent } from "./components/Landing/info-landing/info-landing.component";
import { LandingPagesComponent } from "./components/Pages/Landing-page/landing-pages/landing-pages.component"; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent, 
    InfoLandingComponent, 
   
   
   
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sabor-Brasa-Angular';
}
