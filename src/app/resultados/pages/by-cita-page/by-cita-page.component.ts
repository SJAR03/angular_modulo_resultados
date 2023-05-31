import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

type TipoOrden = 'Especializados' | 'Generales' | 'Diagnóstico';

@Component({
  selector: 'resultados-by-cita-page',
  templateUrl: './by-cita-page.component.html',
  styles: []
})
export class ByCitaPageComponent {

  public resultados: Resultados[] = [];
  public citas: TipoOrden[] = ['Especializados', 'Generales', 'Diagnóstico'];
  public selectedCita?: TipoOrden;

  constructor(private resultadosService: ResultadosService) { }

  public searchByTipoOrden(): void {
    this.resultadosService.searchByTipoOrden(1,1).subscribe(
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
