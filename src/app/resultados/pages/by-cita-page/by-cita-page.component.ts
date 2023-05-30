import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

type Cita = 'Especializados' | 'Generales' | 'Diagnóstico';

@Component({
  selector: 'resultados-by-cita-page',
  templateUrl: './by-cita-page.component.html',
  styles: []
})
export class ByCitaPageComponent {

  public resultados: Resultados[] = [];
  public citas: Cita[] = ['Especializados', 'Generales', 'Diagnóstico'];
  public selectedCita?: Cita;

  constructor(private resultadosService: ResultadosService) { }

  public searchByCita(): void {
    this.resultadosService.searchByCita(1).subscribe(
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
