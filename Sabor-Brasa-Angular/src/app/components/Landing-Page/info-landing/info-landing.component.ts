import { Component, AfterViewInit, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-info-landing',
  templateUrl: './info-landing.component.html',
  styleUrls: ['./info-landing.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InfoLandingComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    const alreadyReloaded = sessionStorage.getItem('infoLandingReloaded');

    if (!alreadyReloaded) {
      sessionStorage.setItem('infoLandingReloaded', 'true');
      location.reload();
    } else {
      sessionStorage.removeItem('infoLandingReloaded');
    }
  }

  ngAfterViewInit(): void {
    this.initSidebar();
  }

  private initSidebar(): void {
    const toggle = document.getElementById('header-toggle');
    const sidebar = document.getElementById('sidebar');
    const header = document.getElementById('header');
    const main = document.getElementById('main');

    if (toggle && sidebar && header && main) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('show-sidebar');
        header.classList.toggle('left-pd');
        main.classList.toggle('left-pd');
      });
    }

    const sidebarLinks = document.querySelectorAll('.sidebar__list a');
    sidebarLinks.forEach(link =>
      link.addEventListener('click', () => {
        sidebarLinks.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
      })
    );
  }
}
