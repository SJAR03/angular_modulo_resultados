import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/resultados';
import { ResultadosService } from '../../services/resultados.service';

type TipoOrden = 'Cita'|'Emergencia'|'Rutina';

@Component({
  selector: 'resultados-by-tipoorden-page',
  templateUrl: './by-tipoorden-page.component.html',
  styles: [
  ]
})
export class ByTipoOrdenPageComponent {

  public resultados: Resultados[] = [];
  public tipoordeness: TipoOrden[] = ['Cita','Emergencia','Rutina'];
  public selectedTipoOrden?: TipoOrden;

  constructor(private resultadosService: ResultadosService){}

  searchByTipoOrden(tipoorden:TipoOrden):void{
    this.selectedTipoOrden = tipoorden;
    this.resultadosService.searchByTipoOrden(tipoorden)
    .subscribe(resultados => {
      this.resultados = resultados
    });

  }
}

