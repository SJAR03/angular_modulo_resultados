import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ByCitaPageComponent } from './pages/by-cita-page/by-cita-page.component';
import { ByEmergenciaPageComponent } from './pages/by-emergencia-page/by-emergencia-page.component';
import { ByRutinaPageComponent } from './pages/by-rutina-page/by-rutina-page.component';
import { ResultadosRoutingModule } from './resultados-routing.module';
import { ResultadosTableComponent } from './components/resultados-table/resultados-table.component';
import { ResultadoPageComponent } from './pages/resultado-page/resultado-page.component';
import { EditButtonComponent } from './components/edit-button/edit-button.component';


@NgModule({
  imports: [
    FormsModule,
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
    ResultadoPageComponent,
    EditButtonComponent,
  ],
  providers: [],
})
export class ResultadosModule { }
