import { Component, Input } from '@angular/core';
import { Resultados } from '../../interfaces/results'

@Component({
  selector: 'resultados-table',
  templateUrl: './resultados-table.component.html',
  styles: [
  ]
})
export class ResultadosTableComponent {
  @Input()
  public resultados: Resultados[] = [];

}