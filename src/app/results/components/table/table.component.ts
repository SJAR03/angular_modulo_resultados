import { Component } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'results-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {
  data = [
    { id: 1, nOrden: 'N001', examen: 'Examen1', resultado: 'Positivo', observaciones: 'Observación1' },
    { id: 2, nOrden: 'N002', examen: 'Examen2', resultado: 'Negativo', observaciones: 'Observación2' },
    // Agrega más datos según sea necesario
  ];

  selectedOption: string = 'Cita';
  searchText: string = '';

  get filteredData() {
    return this.data.filter(row => {
      return row.examen.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  agregar() {
    // Lógica para agregar un nuevo resultado
    // Puedes implementar el comportamiento según tus necesidades
  }

  sort(columnIndex: number) {
    // Lógica para ordenar la tabla por la columna seleccionada
    // Puedes utilizar los métodos de ordenamiento de la matriz de datos 'this.data'
  }

  mostrarPopup(row: any) {
    // Lógica para mostrar la ventana emergente (popup) con los detalles del resultado seleccionado
    // Puedes utilizar los datos de 'row' para mostrar la información en la ventana emergente
  }
  
}
