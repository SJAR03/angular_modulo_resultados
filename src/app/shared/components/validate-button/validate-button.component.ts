import { Component } from '@angular/core';
import { Usuario } from 'src/app/resultados/interfaces/results';
import { ResultadosService } from 'src/app/resultados/services/resultados.service';

@Component({
  selector: 'shared-validate-button',
  templateUrl: './validate-button.component.html',
  styleUrls: ['./validate-button.component.css']
})
export class ValidateButtonComponent {
  public mostrarFormularioValidacion: boolean = false;
  public fechaSeleccionada: string | null = null;
  public idUsuarioSeleccionado: string | null = null;
  public usuarios: Usuario[] = [];

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
