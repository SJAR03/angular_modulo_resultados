import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/resultados';
import { ResultadosService } from '../../services/resultados.service';

type Rutina = 'Especializados'|'Generales'|'Diagnóstico';

@Component({
  selector: 'resultados-by-rutina-page',
  templateUrl: './by-rutina-page.component.html',
  styles: [
  ]
})
export class ByRutinaPageComponent {

  public resultados: Resultados[] = [];
  public rutinas: Rutina[] = ['Especializados','Generales','Diagnóstico'];
  public selectedRutina?: Rutina;

  constructor(private resultadosService: ResultadosService){}

  searchByRutina(rutina:Rutina):void{
    this.selectedRutina = rutina;
    this.resultadosService.searchByRutina(rutina)
    .subscribe(resultados => {
      this.resultados = resultados
    });

  }
}

