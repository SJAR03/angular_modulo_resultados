import { Component } from '@angular/core';
import { Resultados } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

type Cita = 'Especializados'|'Generales'|'Diagnóstico';

@Component({
  selector: 'resultados-by-cita-page',
  templateUrl: './by-cita-page.component.html',
  styles: [
  ]
})
export class ByCitaPageComponent {

  public resultados: Resultados[] = [];
  public citas: Cita[] = ['Especializados','Generales','Diagnóstico'];
  public selectedCita?: Cita;

  constructor(private resultadosService: ResultadosService){}

  searchByCita(cita:Cita):void{
    this.selectedCita = cita;
    this.resultadosService.searchByCita(cita)
    .subscribe(resultados => {
      this.resultados = resultados
    });

  }
}
