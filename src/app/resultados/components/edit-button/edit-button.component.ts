import { Component, Input } from '@angular/core';
import { Resultados } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css']
})
export class EditButtonComponent {
  @Input()
  public resultado: Resultados | null = null;

  public mostrarFormulario: boolean = false;
  public resultadoModificado: Partial<Resultados> = {};

  constructor(private resultadosService: ResultadosService) {}

  abrirFormulario(): void {
    if (this.resultado) {
      this.resultadoModificado = { ...this.resultado };
      this.mostrarFormulario = true;
    }
  }

  cancelarEdicion(): void {
    this.mostrarFormulario = false;
    this.resultadoModificado = {};
  }

  actualizarResultado(): void {
    if (this.resultado && this.resultadoModificado) {
      const resultadoActualizado: Resultados = {
        ...this.resultado,
        resultado: this.resultadoModificado.resultado || this.resultado.resultado,
        observaciones: this.resultadoModificado.observaciones || this.resultado.observaciones,
        estado: 2 // Actualizar el campo "estado"
      };

      this.resultadosService.actualizarResultado(this.resultado.idResultados, resultadoActualizado).subscribe(
        (resultadoActualizado: Resultados) => {
          // El resultado ha sido actualizado exitosamente, realiza las acciones necesarias (por ejemplo, mostrar un mensaje de éxito, actualizar la lista de resultados)
          console.log('Resultado actualizado:', resultadoActualizado);
          this.mostrarFormulario = false;
          this.resultadoModificado = {};
        },
        (error) => {
          // Manejo de error en caso de que ocurra un problema durante la actualización
          console.error('Error al actualizar el resultado:', error);
        }
      );
    }
  }

}
