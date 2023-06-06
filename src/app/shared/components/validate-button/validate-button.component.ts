import { Component } from '@angular/core';
import { ResultadosService} from 'src/app/resultados/services/resultados.service';
import { Resultados, OrdenDetalle } from 'src/app/resultados/interfaces/results';
import { catchError, distinct, forkJoin, map, of } from 'rxjs';
@Component({
  selector: 'shared-validate-button',
  templateUrl: './validate-button.component.html',
  styleUrls: ['./validate-button.component.css']
})
export class ValidateButtonComponent {
  public mostrarFormularioValidacion: boolean = false;
  public fechaSeleccionada: string | null = null;
  public idUsuarioSeleccionado: string | null = null;
  public idOrdenSeleccionada: number | null = null;
  public examanesSinResultado: boolean = false;
  public resultados: Resultados[] = [];
  public ordenesConResultados: number[] = [];
  ordenesDetalle: OrdenDetalle[] = [];
  ordenesConExamenesPendientes: number[] = [];

  constructor(private resultadosService: ResultadosService) {}

  ngOnInit(): void {
    this.listarOrdenesDetalle();
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
        });
      },
      (error) => {
        console.error('Error al obtener la lista de órdenes detalle:', error);
      }
    );
  }
  
  
  tieneTodosLosExamenesConResultados(idOrden: number): boolean {
    return !this.ordenesConExamenesPendientes.includes(idOrden);
  }


  verificarResultados(): void {
    if (this.idOrdenSeleccionada) {
      this.resultadosService.getResultadosByOrden(this.idOrdenSeleccionada).subscribe(
        (resultados: Resultados[]) => {
          const examenesOrden = this.ordenesDetalle.filter((ordenDetalle) => ordenDetalle.idOrden === this.idOrdenSeleccionada);

          // Verificar si todos los exámenes de la orden tienen resultados
          this.examanesSinResultado = examenesOrden.some((ordenDetalle) =>
            !resultados.some((resultado) => resultado.idExamen === ordenDetalle.idExamen)
          );
        },
        (error) => {
          console.error('Error al obtener los resultados de la orden:', error);
        }
      );
    } else {
      this.examanesSinResultado = false;
    }
  }

  cancelarValidacion(): void {
    this.mostrarFormularioValidacion = false;
    this.fechaSeleccionada = null;
    this.idUsuarioSeleccionado = null;
  }

  guardarValidacion(): void {
    // Lógica para guardar la validación (implementar según tus necesidades)
    console.log('Guardar validación');
  }
}
