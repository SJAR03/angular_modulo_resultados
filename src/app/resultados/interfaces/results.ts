// Generated by https://quicktype.io

export interface Resultados {
  idResultados:     number;
  idExamen:         number;
  idOrden:          number;
  idUsuarioProcesa?: number;
  idUsuarioImprime?: number | null;
  observaciones:    string;
  fechaProcesa:     string;
  idUsuarioValida?:  number | null;
  impreso?:          number | null;
  fechaImprime?:     string | null;
  validado?:         string;
  resultado:        string;
  estado?:           number | null;
  fechaValida?:      string | null;
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
  n_Orden:        string;
}

export interface Orden {
  idOrden:        number;
  idTipoOrden:    number;
  n_Orden:        string;
}

export interface Usuario {
  idUsuario:     number;
  login:    string;
}

export interface Examen {
  idExamen:         number;
  idAreaLabServicio: number;
  descripcionCorta: string;
}