import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

type TipoOrden = 'Especializados' | 'Generales' | 'Diagnóstico';

@Component({
  selector: 'resultados-by-rutina-page',
  templateUrl: './by-rutina-page.component.html',
  styles: []
})
export class ByRutinaPageComponent {

  public resultados: Resultados[] = [];
  public rutinas: TipoOrden[] = ['Especializados', 'Generales', 'Diagnóstico'];
  public selectedRutina?: TipoOrden;

  constructor(private resultadosService: ResultadosService) { }

  public searchByTipoOrden(): void {
    this.resultadosService.searchByTipoOrden(3).subscribe(
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