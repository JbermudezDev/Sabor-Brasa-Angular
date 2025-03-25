import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/Landing-Page/header/header.component';
import { InfoLandingComponent } from 'src/app/components/Landing-Page/info-landing/info-landing.component';
import { FooterComponent } from 'src/app/components/Landing-Page/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, InfoLandingComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

}
