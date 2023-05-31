import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

type TipoOrden = 'Especializados'|'Generales'|'Diagnóstico';

@Component({
  selector: 'resultados-by-emergencia-page',
  templateUrl: './by-emergencia-page.component.html',
  styles: [
  ]
})
export class ByEmergenciaPageComponent {

  public resultados: Resultados[] = [];
  public emergencias: TipoOrden[] = ['Especializados','Generales','Diagnóstico'];
  public selectedEmergencia?: TipoOrden;

  constructor(private resultadosService: ResultadosService){}

  public searchByTipoOrden(): void {
    this.resultadosService.searchByTipoOrden(2).subscribe(
      resultados => {
        this.resultados = resultados;
        console.log(resultados);
      },
      error => {
        console.error(error);
      }
    );
  }
  public todo(): void {
    this.resultadosService.getResultadosRequest().subscribe(
      resultados => {
        this.resultados = resultados;
        console.log(resultados);
      },
      error => {
        console.error(error);
      }
    );
  }
}
