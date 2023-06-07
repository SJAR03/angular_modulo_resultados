import { Component, OnInit } from '@angular/core';
import { ResultadosService } from 'src/app/resultados/services/resultados.service';
import { Resultados, OrdenDetalle, Usuario } from 'src/app/resultados/interfaces/results';
import { catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'shared-validate-button',
  templateUrl: './validate-button.component.html',
  styleUrls: ['./validate-button.component.css']
})
export class ValidateButtonComponent implements OnInit {
  public mostrarFormularioValidacion: boolean = false;
  public fechaSeleccionada: string | null = null;
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
  public ordenValidada: boolean = false;
  usuarios: Usuario[] = [];
  usuarioSeleccionado: number | null = null;
  idUsuarioSeleccionado: number | null = null;
  public mostrarSelect: boolean = false;


  constructor(private resultadosService: ResultadosService) {
    this.mostrarBotonValidar = false;
    this.mostrarBotonCancelar = false;
  }

  ngOnInit(): void {
    this.listarOrdenesDetalle();
    this.obtenerUsuarios();
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
          this.ordenValidada = resultados.some((resultado) => resultado.validado === '1');
          this.mostrarBotonValidar = !this.ordenValidada;
          this.mostrarBotonCancelar = this.ordenValidada;
          this.mostrarFormularioValidacion = this.ordenValidada;
          this.verificarValidacionCancelada();
          console.log(this.ordenValidada);
          console.log(this.resultados);
          setTimeout(() => {});
        },
        (error) => {
          console.error('Error al obtener los resultados de la orden:', error);
        }
      );
    } else {
      this.mostrarBotonValidar = false;
      this.mostrarBotonCancelar = false;
      this.mostrarFormularioValidacion = false; // Agrega esta línea
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

  verificarValidacionCancelada(): void {
    if (this.resultados.length > 0) {
      this.validacionCancelada = this.resultados.some((resultado) => resultado.validado === null);
    }
  }
  
  esOrdenValidada(idOrden: number): boolean {
    const resultadosOrden = this.resultados.filter(
      (resultado) => resultado.idOrden === idOrden
    );
    return resultadosOrden.some((resultado) => resultado.validado === '1');
  }

  obtenerUsuarios(): void {
  this.resultadosService.listarUsuarios().subscribe(
    (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    },
    (error) => {
      console.error('Error al obtener los usuarios', error);
    }
  );
}

seleccionarUsuario(): void {
  console.log('Usuario seleccionado:', this.idUsuarioSeleccionado);
  // Aquí puedes realizar las acciones necesarias con el usuario seleccionado
}
cancelarValidacionPorUsuario(): void {
  if (this.idUsuarioSeleccionado == 1) {
    this.cancelarValidacion(this.idOrdenSeleccionada!);
  } else {
    console.log('Error: Solo el usuario con ID 1 puede cancelar la validación.');
  }
}





}
