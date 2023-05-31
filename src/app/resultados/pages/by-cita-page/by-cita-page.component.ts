import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

type AreaExamen = 'Analisis clinico' | 'Hematologia' | 'Microbiologia' | 'Inmunologia' |
 'Serologia' | 'Parasitologia' | 'Inmunohematología y banco de sangre' | 'Genética humana y diagnóstico molecular';

@Component({
  selector: 'resultados-by-cita-page',
  templateUrl: './by-cita-page.component.html',
  styles: []
})
export class ByCitaPageComponent {

  public resultados: Resultados[] = [];
  public citas: AreaExamen[] = ['Analisis clinico', 'Hematologia', 'Microbiologia', 
  'Inmunologia', 'Serologia', 'Parasitologia', 'Inmunohematología y banco de sangre', 'Genética humana y diagnóstico molecular'];
  public selectedExamen?: AreaExamen;
  public selectedCategoriaExamen?: number;

  constructor(private resultadosService: ResultadosService) { }

  public searchByTipoOrden(): void {
    let idAreaExamen: number | undefined = undefined;
  
    if (this.selectedExamen === 'Analisis clinico') {
      idAreaExamen = 1; // Asigna el valor 1 para 'Especializados'
    } else if (this.selectedExamen === 'Hematologia') {
      idAreaExamen = 2; // Asigna el valor 2 para 'Generales'
    } else if (this.selectedExamen === 'Microbiologia') {
      idAreaExamen = 3; // Asigna el valor 3 para 'Diagnóstico'
    }else if (this.selectedExamen === 'Inmunologia') {
      idAreaExamen = 4; // Asigna el valor 3 para 'Diagnóstico'
    }else if (this.selectedExamen === 'Serologia') {
      idAreaExamen = 5; // Asigna el valor 3 para 'Diagnóstico'
    }else if (this.selectedExamen === 'Parasitologia') {
      idAreaExamen = 6; // Asigna el valor 3 para 'Diagnóstico'
    }else if (this.selectedExamen === 'Inmunohematología y banco de sangre') {
      idAreaExamen = 7; // Asigna el valor 3 para 'Diagnóstico'
    }else if (this.selectedExamen === 'Genética humana y diagnóstico molecular') {
      idAreaExamen = 8; // Asigna el valor 3 para 'Diagnóstico'
    }
  
    if (idAreaExamen !== undefined) {
      this.resultadosService.searchByTipoOrden(1, idAreaExamen).subscribe(
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

