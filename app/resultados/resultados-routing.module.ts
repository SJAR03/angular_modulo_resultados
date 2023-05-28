import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByCitaPageComponent } from './pages/by-cita-page/by-cita-page.component';
import { ByEmergenciaPageComponent } from './pages/by-emergencia-page/by-emergencia-page.component';
import { ByRutinaPageComponent } from './pages/by-rutina-page/by-rutina-page.component';

const routes: Routes=[
 
  {
    path:'by-cita',
    component:ByCitaPageComponent
  },

  {
    path:'by-emergencia',
    component:ByEmergenciaPageComponent
  },

  {
    path:'by-rutina',
    component:ByRutinaPageComponent
  }
 
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class ResultadosRoutingModule { }
