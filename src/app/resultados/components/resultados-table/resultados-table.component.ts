import { Component, Input, OnInit } from '@angular/core';
import { Examen, Orden, Resultados } from '../../interfaces/results'
import { ResultadosService } from '../../services/resultados.service';

@Component({
  selector: 'resultados-table',
  templateUrl: './resultados-table.component.html',
  styles: [
  ]
})
export class ResultadosTableComponent{
  @Input()
  public resultados: Resultados[] = [];
  public ordenes: Orden[] = [];
  public examenes: Examen[] = [];

  constructor(private resultadosService: ResultadosService) { }

  ngOnChanges() {
    if (this.resultados.length > 0) {
      const idsOrden = this.resultados.map(resultado => resultado.idOrden);
      const idsExamen = this.resultados.map(resultado => resultado.idExamen);

      this.resultadosService.getOrdenesById(idsOrden).subscribe((ordenes: any[]) => {
        this.ordenes = ordenes.filter((orden: null) => orden !== null) as Orden[];
      });

      this.resultadosService.getExamenesById(idsExamen).subscribe((examenes: any[]) => {
        this.examenes = examenes.filter((examen: null) => examen !== null) as Examen[];
      });
    } else {
      this.ordenes = [];
      this.examenes = [];
    }
  }

  obtenerNOrden(idOrden: number): string {
    const orden = this.ordenes.find(orden => orden.idOrden === idOrden);
    return orden ? orden.n_Orden : '';
  }

  obtenerDescripcionCortaExamen(idExamen: number): string {
    const examen = this.examenes.find(examen => examen.idExamen === idExamen);
    return examen ? examen.descripcionCorta : '';
  }
  
}