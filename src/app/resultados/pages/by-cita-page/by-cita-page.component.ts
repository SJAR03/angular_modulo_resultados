import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

type TipoExamen = 'Especializados' | 'Generales' | 'Diagnóstico';

@Component({
  selector: 'resultados-by-cita-page',
  templateUrl: './by-cita-page.component.html',
  styles: []
})
export class ByCitaPageComponent {

  public resultados: Resultados[] = [];
  public citas: TipoExamen[] = ['Especializados', 'Generales', 'Diagnóstico'];
  public selectedExamen?: TipoExamen;
  public selectedCategoriaExamen?: number;

  constructor(private resultadosService: ResultadosService) { }

  public searchByTipoOrden(): void {
    let idCategoriaExamen: number | undefined = undefined;
  
    if (this.selectedExamen === 'Generales') {
      idCategoriaExamen = 1; // Asigna el valor 1 para 'Especializados'
    } else if (this.selectedExamen === 'Especializados') {
      idCategoriaExamen = 2; // Asigna el valor 2 para 'Generales'
    } else if (this.selectedExamen === 'Diagnóstico') {
      idCategoriaExamen = 3; // Asigna el valor 3 para 'Diagnóstico'
    }
  
    if (idCategoriaExamen !== undefined) {
      this.resultadosService.searchByTipoOrden(1, idCategoriaExamen).subscribe(
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
  
}

