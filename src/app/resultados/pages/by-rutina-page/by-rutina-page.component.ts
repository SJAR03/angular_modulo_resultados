import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

type AreaExamen = 'Análisis clínico' | 'Hematología' | 'Microbiología' | 'Inmunología' |
 'Serología' | 'Parasitología' | 'Inmunohematología y banco de sangre' | 'Genética humana y diagnóstico molecular';

@Component({
  selector: 'resultados-by-rutina-page',
  templateUrl: './by-rutina-page.component.html',
  styles: []
})
export class ByRutinaPageComponent {

  public resultados: Resultados[] = [];
  public rutinas: AreaExamen[] = ['Análisis clínico', 'Hematología', 'Microbiología', 
  'Inmunología', 'Serología', 'Parasitología', 'Inmunohematología y banco de sangre', 'Genética humana y diagnóstico molecular'];
  public selectedExamen?: AreaExamen;
  public selectedCategoriaExamen?: number;

  constructor(private resultadosService: ResultadosService) { }

  public searchByTipoOrden(): void {
    let idAreaExamen: number | undefined = undefined;
  
    if (this.selectedExamen === 'Análisis clínico') {
      idAreaExamen = 1; // Asigna el valor 1 para 'Análisis Clínico'
    } else if (this.selectedExamen === 'Hematología') {
      idAreaExamen = 2; // Asigna el valor 2 para 'Hematología'
    } else if (this.selectedExamen === 'Microbiología') {
      idAreaExamen = 3; // Asigna el valor 3 para 'Microbiología'
    }else if (this.selectedExamen === 'Inmunología') {
      idAreaExamen = 4; // Asigna el valor 3 para 'Inmunología'
    }else if (this.selectedExamen === 'Serología') {
      idAreaExamen = 5; // Asigna el valor 3 para 'Serología'
    }else if (this.selectedExamen === 'Parasitología') {
      idAreaExamen = 6; // Asigna el valor 3 para 'Parasitologia'
    }else if (this.selectedExamen === 'Inmunohematología y banco de sangre') {
      idAreaExamen = 7; // Asigna el valor 3 para 'Inmunohematología y banco de sangre'
    }else if (this.selectedExamen === 'Genética humana y diagnóstico molecular') {
      idAreaExamen = 8; // Asigna el valor 3 para 'Genética humana y diagnóstico molecular'
    }
  
    if (idAreaExamen !== undefined) {
      this.resultadosService.searchByTipoOrden(3, idAreaExamen).subscribe(
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

