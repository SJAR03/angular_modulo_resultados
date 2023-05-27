// Generated by https://quicktype.io

export interface Resultados {
  idResultados:     number;
  idExamen:         number;
  idOrden:          number;
  idUsuarioProcesa: number;
  idUsuarioImprime: number;
  observaciones:    string;
  fechaProcesa:     Date;
  idUsuarioValida:  number;
  impreso:          number;
  fechaImprime:     Date;
  validado:         string;
  resultado:        string;
  estado:           number;
  fechaValida:      Date;
  procesado:        string;
}

export interface Empleados {
  idProfesiones:   number;
  idEmpleado:      number;
  primerNombre:    string;
  segundoNombre:   string;
  primerApellido:  string;
  segundoApellido: string;
}

export interface OrdenDetalle {
  idOrdenDetalle: number;
  idOrden:        number;
  idExamen:       number;
  n_Orden:        String;
}

export interface Orden {
  idOrden:        number;
  idTipoOrden:    number;
  n_Orden:        String;
}

export interface Usuario {
  idUsuario:     number;
  idEmpleado:    number;
}

export interface Examen {
  idExamen:         number;
  idCategoriaExamen: number;
  descripcionCorta: String;
}