import { Component, Input } from '@angular/core';
import { Resultados } from '../../interfaces/resultados';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

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