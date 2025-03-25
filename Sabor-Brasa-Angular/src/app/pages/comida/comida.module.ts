import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComidaRoutingModule } from './comida-routing.module';
import { ComidaListComponent } from './comida-list/comida-list.component';
import { ComidaFormComponent } from './comida-form/comida-form.component';


@NgModule({
  declarations: [
    ComidaListComponent,
    ComidaFormComponent
  ],
  imports: [
    CommonModule,
    ComidaRoutingModule
  ]
})
export class ComidaModule { }
