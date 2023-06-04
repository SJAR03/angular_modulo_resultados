import { Component, Input } from '@angular/core';
import { Examen, Orden, Resultados } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

@Component({
  selector: 'resultados-table',
  templateUrl: './resultados-table.component.html',
})
export class ResultadosTableComponent {
  @Input()
  public resultados: Resultados[] = [];
  public ordenes: Orden[] = [];
  public examenes: Examen[] = [];
  public popupData: Resultados | null = null;
  public showPopup = false;
  public resultadoSeleccionadoId: number | null = null; // Variable para almacenar el ID del resultado seleccionado

  constructor(private resultadosService: ResultadosService) {}

  ngOnChanges(): void {
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

  mostrarPopup(resultado: Resultados): void {
    this.popupData = resultado;
    this.resultadoSeleccionadoId = this.popupData.idResultados; // Almacenar el ID del resultado seleccionado
    this.showPopup = true;
    console.log(this.popupData);
  }

  cerrarPopup(event: Event): void {
    event.stopPropagation();
    this.popupData = null;
    this.showPopup = false;
  }

  eliminarResultado(): void {
    if (this.resultadoSeleccionadoId) {
      this.resultadosService.eliminarResultadoPorId(this.resultadoSeleccionadoId).subscribe(
        () => {
          // Eliminación exitosa, realiza las acciones necesarias (por ejemplo, actualizar la lista de resultados)
          // Aquí puedes llamar a otro método para obtener los resultados actualizados o manipular la lista actual directamente
        },
        (error) => {
          // Manejo de error en caso de que ocurra un problema durante la eliminación
          console.error('Error al eliminar el resultado:', error);
        }
      );
    }
  }
}