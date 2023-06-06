import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ResultadosService } from 'src/app/resultados/services/resultados.service';
import { Resultados, OrdenDetalle } from 'src/app/resultados/interfaces/results';
import { catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'shared-validate-button',
  templateUrl: './validate-button.component.html',
  styleUrls: ['./validate-button.component.css']
})
export class ValidateButtonComponent implements OnInit, AfterViewInit {
  public mostrarFormularioValidacion: boolean = false;
  public fechaSeleccionada: string | null = null;
  public idUsuarioSeleccionado: string | null = null;
  public idOrdenSeleccionada: number | null = null;
  public examenesSinResultado: boolean = false;
  public resultados: Resultados[] = [];
  public ordenesConResultados: number[] = [];
  public ordenesDetalle: OrdenDetalle[] = [];
  public ordenesConExamenesPendientes: number[] = [];
  public mostrarBotonValidar: boolean = false;
  public mostrarBotonCancelar: boolean = false;
  public validacionCancelada: boolean = false;
  public fechaValida: string | null = null;

  constructor(
    private resultadosService: ResultadosService,
    private cdr: ChangeDetectorRef
  ) {
    this.mostrarBotonValidar = false;
    this.mostrarBotonCancelar = false;
  }

  ngOnInit(): void {
    this.listarOrdenesDetalle();
  }

  ngAfterViewInit(): void {
    this.verificarOrdenesValidadas();
  }

  listarOrdenesDetalle(): void {
    this.resultadosService.ListadoOrdenesConExamenes().subscribe(
      (ordenesDetalle: OrdenDetalle[]) => {
        this.ordenesDetalle = ordenesDetalle;

        forkJoin(
          ordenesDetalle.map((ordenDetalle) =>
            this.resultadosService
              .getResultadosByOrdenAndExamen(ordenDetalle.idOrden, ordenDetalle.idExamen)
              .pipe(
                map((resultados) => resultados.length > 0),
                catchError(() => of(false))
              )
          )
        ).subscribe((results: boolean[]) => {
          results.forEach((hasResultados, index) => {
            if (!hasResultados) {
              this.ordenesConExamenesPendientes.push(ordenesDetalle[index].idOrden);
            }
          });
          this.ordenesDetalle = this.ordenesDetalle.filter(
            (ordenDetalle, index, self) =>
              self.findIndex((o) => o.idOrden === ordenDetalle.idOrden) === index
          );
          this.verificarOrdenesValidadas();
        });
      },
      (error) => {
        console.error('Error al obtener la lista de órdenes detalle:', error);
      }
    );
  }

  verificarOrdenesValidadas(): void {
    if (this.idOrdenSeleccionada !== null) {
      this.resultadosService.getResultadosByOrden(this.idOrdenSeleccionada).subscribe(
        (resultados: Resultados[]) => {
          this.resultados = resultados;
          const ordenValidada = resultados.some((resultado) => resultado.validado === '1');
          this.mostrarBotonValidar = !ordenValidada;
          this.mostrarBotonCancelar = ordenValidada;
          this.verificarValidacionCancelada();
          this.cdr.detectChanges(); // Forzar la detección de cambios después de actualizar las variables
        },
        (error) => {
          console.error('Error al obtener los resultados de la orden:', error);
        }
      );
    } else {
      this.mostrarBotonValidar = false;
      this.mostrarBotonCancelar = false;
    }
  }

  verificarValidacionCancelada(): void {
    if (this.resultados.length > 0) {
      this.validacionCancelada = this.resultados.some((resultado) => resultado.validado === null);
    }
  }

  cancelarValidacion(idOrden: number): void {
    this.resultadosService.getResultadosByOrden(idOrden).subscribe(
      (resultados: Resultados[]) => {
        const updateResults$ = resultados.map((resultado) => {
          const updatedResultado = {
            ...resultado,
            validado: null as unknown as string,
            fechaValida: null as unknown as string
          } as Resultados;
          return this.resultadosService.actualizarResultado(resultado.idResultados, updatedResultado);
        });

        forkJoin(updateResults$).subscribe(
          () => {
            console.log('Resultados validación cancelada correctamente');
            // Realizar cualquier otra acción necesaria después de la cancelación de la validación
            this.mostrarFormularioValidacion = false;

            // Volver a verificar la validación cancelada
            this.verificarValidacionCancelada();
            this.cdr.detectChanges(); // Forzar la detección de cambios después de actualizar las variables
          },
          (error) => {
            console.error('Error al cancelar la validación de los resultados:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener los resultados de la orden:', error);
      }
    );
  }

  validarOrden(idOrden: number): void {
    this.resultadosService.getResultadosByOrden(idOrden).subscribe(
      (resultados: Resultados[]) => {
        const updateResults$ = resultados.map((resultado) => {
          const fechaValidaFormatted = this.fechaValida ? new Date(this.fechaValida).toISOString() : null;
          const updatedResultado = {
            ...resultado,
            validado: '1',
            fechaValida: fechaValidaFormatted
          };
          return this.resultadosService.actualizarResultado(resultado.idResultados, updatedResultado);
        });

        forkJoin(updateResults$).subscribe(
          () => {
            console.log('Resultados validados correctamente');
            // Realizar cualquier otra acción necesaria después de la validación
            this.mostrarFormularioValidacion = true;
            this.verificarOrdenesValidadas(); // Actualizar el estado de los botones después de la validación
            this.cdr.detectChanges(); // Forzar la detección de cambios después de actualizar las variables
          },
          (error) => {
            console.error('Error al validar los resultados:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener los resultados de la orden:', error);
      }
    );
  }

  tieneTodosLosExamenesConResultados(idOrden: number): boolean {
    return !this.ordenesConExamenesPendientes.includes(idOrden);
  }

  esOrdenValidada(idOrden: number): boolean {
    const resultadosOrden = this.resultados.filter(
      (resultado) => resultado.idOrden === idOrden
    );
    return resultadosOrden.some((resultado) => resultado.validado === '1');
  }
}
