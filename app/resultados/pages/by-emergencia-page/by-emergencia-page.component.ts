import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/resultados';
import { ResultadosService } from '../../services/resultados.service';

type Emergencia = 'Especializados'|'Generales'|'Diagnóstico';

@Component({
  selector: 'resultados-by-emergencia-page',
  templateUrl: './by-emergencia-page.component.html',
  styles: [
  ]
})
export class ByEmergenciaPageComponent {

  public resultados: Resultados[] = [];
  public emergencias: Emergencia[] = ['Especializados','Generales','Diagnóstico'];
  public selectedEmergencia?: Emergencia;

  constructor(private resultadosService: ResultadosService){}

  searchByEmergencia(emergencia:Emergencia):void{
    this.selectedEmergencia = emergencia;
    this.resultadosService.searchByEmergencia(emergencia)
    .subscribe(resultados => {
      this.resultados = resultados
    });

  }
}

