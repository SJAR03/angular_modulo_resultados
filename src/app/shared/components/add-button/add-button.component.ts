import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OrdenDetalle } from 'src/app/resultados/interfaces/results';
import { ResultadosService } from 'src/app/resultados/services/resultados.service';

interface OpcionExamen {
  idExamen: string;
  colorFondo: string;
  observaciones: string;
  camposExtras: string[];
}

interface OrdenConExamenes {
  idOrden: string;
  examenes: OpcionExamen[];
}

@Component({
  selector: 'shared-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements AfterViewInit {
  ordenesConExamenes: OrdenConExamenes[] = [];
  selectedOrden: string = '';
  ordenes: string[] = [];
  opciones: { [key: string]: OpcionExamen[] } = {};

  constructor(private resultadosService: ResultadosService) {
    this.opciones = {}; // Inicializar opciones
  }
  
  @ViewChild("camposExtras", { static: false }) camposExtras!: ElementRef;

  ngOnInit() {
    this.ListadoOrdenesConExamenes();
  }

  ListadoOrdenesConExamenes() {
    this.resultadosService.ListadoOrdenesConExamenes().subscribe(
      (ordenDetalle: OrdenDetalle[]) => {
        const ordenesMap: Map<string, OpcionExamen[]> = new Map();

        ordenDetalle.forEach((detalle: OrdenDetalle) => {
          const idOrden = detalle.idOrden.toString();
          const idExamen = detalle.idExamen.toString();

          if (ordenesMap.has(idOrden)) {
            // Agregar examen a la orden existente
            const examenes = ordenesMap.get(idOrden)!;
            examenes.push({
              idExamen: idExamen,
              colorFondo: '',
              observaciones: '',
              camposExtras: []
            });
          } else {
            // Crear nueva orden con el primer examen
            ordenesMap.set(idOrden, [
              {
                idExamen: idExamen,
                colorFondo: '',
                observaciones: '',
                camposExtras: []
              }
            ]);
          }
        });

        this.ordenesConExamenes = Array.from(ordenesMap).map(([idOrden, examenes]) => {
          return {
            idOrden: idOrden,
            examenes: examenes
          };
        });

        // Obtener lista de órdenes para el select
        this.ordenes = Array.from(ordenesMap.keys());
      },
      error => {
        console.error('Error al obtener las órdenes con exámenes', error);
      }
    );
  }

  actualizarLista2() {
    const seleccion = this.selectedOrden;
    this.camposExtras.nativeElement.innerHTML = ""; // Limpiar campos extras anteriores

    if (seleccion !== "") {
      const opcionesLista = this.ordenesConExamenes.find(o => o.idOrden === seleccion)?.examenes;

      if (opcionesLista) {
        opcionesLista.forEach((opcion: OpcionExamen) => {
          const formGroupDiv = document.createElement("div");
          formGroupDiv.className = "form-group";

          // Primer textarea con clase "form-control" y altura de 100px
          const formFloatingDiv1 = document.createElement("div");
          formFloatingDiv1.className = "form-floating";

          const textarea1 = document.createElement("textarea");
          textarea1.className = "form-control";
          textarea1.placeholder = "Leave a comment here";
          textarea1.style.height = "100px";
          textarea1.style.marginTop = "5px"; // Agregar margen de 5px arriba
          textarea1.id = "textarea1-" + opcion.idExamen.toLowerCase(); // Asignar un ID único para cada textarea

          const label1 = document.createElement("label");
          label1.htmlFor = textarea1.id;
          label1.textContent = opcion.idExamen;

          formFloatingDiv1.appendChild(textarea1);
          formFloatingDiv1.appendChild(label1);
          formGroupDiv.appendChild(formFloatingDiv1);

          // Segundo textarea de observaciones con clase "form-control"
          const formFloatingDiv2 = document.createElement("div");
          formFloatingDiv2.className = "form-floating";

          const textarea2 = document.createElement("textarea");
          textarea2.className = "form-control";
          textarea2.placeholder = "Leave a comment here";
          textarea2.style.marginTop = "5px"; // Agregar margen de 5px arriba
          textarea2.id = "textarea2-" + opcion.idExamen.toLowerCase(); // Asignar un ID único para cada textarea

          const label2 = document.createElement("label");
          label2.htmlFor = textarea2.id;
          label2.textContent = "Observaciones de " + opcion.idExamen;

          formFloatingDiv2.appendChild(textarea2);
          formFloatingDiv2.appendChild(label2);
          formGroupDiv.appendChild(formFloatingDiv2);

          // Botones
          const buttonDiv = document.createElement("div");
          buttonDiv.className = "button-container";

          const redButton = document.createElement("button");
          redButton.className = "btn btn-danger";
          redButton.textContent = "Rojo";
          redButton.innerHTML = "&#10006;"; // Icono "x"
          redButton.style.backgroundColor = "transparent"; // Quitar el fondo cuadrado
          redButton.style.border = "none"; // Quitar el borde
          redButton.style.boxShadow = "none"; // Quitar la sombra
          redButton.style.marginRight = "5px"; // Agregar margen derecho de 5px
          redButton.addEventListener("click", () => {
            this.handleButtonClick(opcion, 'red');
          });

          const greenButton = document.createElement("button");
          greenButton.className = "btn btn-success";
          greenButton.textContent = "Verde";
          greenButton.innerHTML = "&#10004;"; // Icono "check"
          greenButton.style.backgroundColor = "transparent"; // Quitar el fondo cuadrado
          greenButton.style.border = "none"; // Quitar el borde
          greenButton.style.boxShadow = "none"; // Quitar la sombra
          greenButton.addEventListener("click", () => {
            this.handleButtonClick(opcion, 'green');
          });

          buttonDiv.appendChild(redButton);
          buttonDiv.appendChild(greenButton);
          formGroupDiv.appendChild(buttonDiv);

          this.camposExtras.nativeElement.appendChild(formGroupDiv);
        });
      }
    }
  }

  handleButtonClick(opcion: OpcionExamen, color: string) {
    const textarea1Id = "textarea1-" + opcion.idExamen.toLowerCase();
    const textarea2Id = "textarea2-" + opcion.idExamen.toLowerCase();

    const textarea1 = document.getElementById(textarea1Id) as HTMLTextAreaElement;
    const textarea2 = document.getElementById(textarea2Id) as HTMLTextAreaElement;

    if (color === 'red') {
      textarea1.style.backgroundColor = '#FFCCCC';
      textarea2.style.backgroundColor = '#FFCCCC';
    } else if (color === 'green') {
      textarea1.style.backgroundColor = '#CCFFCC';
      textarea2.style.backgroundColor = '#CCFFCC';
    }
  }

  cerrarPopupAgregar() {
    const popupAgregar = document.getElementById("agregarPopup");
    if (popupAgregar) {
      popupAgregar.style.display = "none";
    }
  }

  agregarResultado() {
    // Lógica para guardar el resultado
  }

  // Código para mostrar el popup de agregar al hacer clic en el botón "Agregar"
  ngAfterViewInit() {
    // Código para mostrar el popup de agregar al hacer clic en el botón "Agregar"
    let agregarBtn = document.querySelector(".agregarBtn") as HTMLElement;
    agregarBtn.addEventListener("click", () => {
      const agregarPopup = document.getElementById("agregarPopup");
      if (agregarPopup) {
        agregarPopup.style.display = "block";
      }
    });
  }

}
