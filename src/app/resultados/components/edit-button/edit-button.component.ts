import { Component, Input } from '@angular/core';
import { Resultados, Usuario } from '../../interfaces/results';
import { ResultadosService } from '../../services/resultados.service';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css']
})
export class EditButtonComponent {
  @Input()
  public resultado: Resultados | null = null;

  public mostrarFormularioIdUsuario: boolean = false;
  public mostrarFormularioResultado: boolean = false;
  public mostrarMensajeError: boolean = false;

  public resultadoModificado: Partial<Resultados> = {};

  public usuarios: Usuario[] = [];
  public idUsuarioSeleccionado: string | null = null;

  constructor(private resultadosService: ResultadosService) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.resultadosService.listarUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  validarUsuario(): void {
    if (this.idUsuarioSeleccionado === '1' || this.idUsuarioSeleccionado === '4') {
      this.mostrarFormularioIdUsuario = false;
      this.mostrarFormularioResultado = true;
      this.mostrarMensajeError = false; // Resetear el mensaje de error en caso de que se haya mostrado anteriormente

      // Asignar los valores actuales al resultado modificado
      if (this.resultado) {
        this.resultadoModificado.resultado = this.resultado.resultado;
        this.resultadoModificado.observaciones = this.resultado.observaciones;
      }
    } else {
      this.mostrarMensajeError = true;
      this.mostrarFormularioResultado = false; // Ocultar el formulario de resultado si el usuario no tiene permisos
    }
  }

  cancelarEdicion(): void {
    this.mostrarFormularioIdUsuario = false;
    this.mostrarFormularioResultado = false;
    this.mostrarMensajeError = false;
    this.resultadoModificado = {};
  }

  actualizarResultado(): void {
    if (this.resultado && this.resultadoModificado) {
      const resultadoActualizado: Resultados = {
        ...this.resultado,
        resultado: this.resultadoModificado.resultado || this.resultado.resultado,
        observaciones: this.resultadoModificado.observaciones || this.resultado.observaciones,
        estado: 2,
        impreso: this.resultadoModificado.impreso
      };

      this.resultadosService.actualizarResultado(this.resultado.idResultados, resultadoActualizado).subscribe(
        (resultadoActualizado: Resultados) => {
          console.log('Resultado actualizado:', resultadoActualizado);
          this.mostrarFormularioResultado = false;
          this.resultadoModificado = {};
        },
        (error) => {
          console.error('Error al actualizar el resultado:', error);
        }
      );
    } else {
      console.log('No tienes permisos para editar el registro.');
    }
  }

  setImpreso(impreso: number): void {
    this.resultadoModificado.impreso = impreso;
  }
}
