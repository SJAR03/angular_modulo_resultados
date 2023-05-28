import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ByCitaPageComponent } from './pages/by-cita-page/by-cita-page.component';
import { ByEmergenciaPageComponent } from './pages/by-emergencia-page/by-emergencia-page.component';
import { ByRutinaPageComponent } from './pages/by-rutina-page/by-rutina-page.component';
import { ResultadosRoutingModule } from './resultados-routing.module';
import { ResultadosTableComponent } from './components/resultados-table/resultados-table.component';


@NgModule({
  imports: [
    CommonModule,
    ResultadosRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    ByCitaPageComponent,
    ByEmergenciaPageComponent,
    ByRutinaPageComponent,
    ResultadosTableComponent,
  ],
  providers: [],
})
export class ResultadosModule { }
