import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../Landing-Page/footer/footer.component";
import { HeaderComponent } from '../../Landing-Page/header/header.component';
import { HeaderclienteComponent } from '../headercliente/headercliente.component';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-info-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FooterComponent, HeaderclienteComponent],
  templateUrl: './info-cliente.component.html',
  styleUrls: ['./info-cliente.component.css'],
  encapsulation: ViewEncapsulation.None
  
})
export class InfoClienteComponent {

}



