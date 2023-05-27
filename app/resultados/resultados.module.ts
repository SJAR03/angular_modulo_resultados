import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ByTipoOrdenPageComponent } from './pages/by-tipoorden-page/by-tipoorden-page.component';
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
    ByTipoOrdenPageComponent,
    ResultadosTableComponent,
  ],
  providers: [],
})
export class ResultadosModule { }
