import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-info-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './info-landing.component.html',
  styleUrls: ['./info-landing.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InfoLandingComponent {

}