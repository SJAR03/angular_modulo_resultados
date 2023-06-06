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
  public impreso: number | null = null;
  public textareaStyle: any = {}; // Variable para almacenar los estilos de los textarea

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
    this.impreso = null;
  }

  guardarCambios(): void {
    if (this.resultado && this.resultadoModificado && this.impreso !== null) {
      const resultadoActualizado: Resultados = {
        ...this.resultado,
        resultado: this.resultadoModificado.resultado || this.resultado.resultado,
        observaciones: this.resultadoModificado.observaciones || this.resultado.observaciones,
        impreso: this.impreso
      };

      this.resultadosService.actualizarResultado(this.resultado.idResultados, resultadoActualizado).subscribe(
        (resultadoActualizado: Resultados) => {
          console.log('Resultado actualizado:', resultadoActualizado);
        },
        (error) => {
          console.error('Error al actualizar el resultado:', error);
        }
      );
    }
  }

  handleButtonClick(opcion: number): void {
    this.impreso = opcion;

    // Actualizar los estilos de los textarea
    this.textareaStyle = {
      'border-color': opcion === 1 ? 'red' : 'green'
    };
  }
}