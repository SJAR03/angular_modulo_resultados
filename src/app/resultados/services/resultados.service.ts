import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, switchMap, throwError } from 'rxjs';
import { Resultados, Orden, Examen, OrdenDetalle } from '../interfaces/results';

@Injectable({providedIn: 'root'})
export class ResultadosService {

  private apiUrlResultados: string = 'http://localhost:8086/api/resultados'; 
  private apiUrlResultadosXOrdenId: string = 'http://localhost:8086/api/resultados/examen/{id}'; 
  private apiUrlResultadosXExamenId: string = 'http://localhost:8086/api/resultados/orden/{id}'; 
  private apiUrlOrden: string = 'http://localhost:8084/api/ordenes';
  private apiUrlExamen: string = 'http://localhost:8083/api/examenes';
  private apiUrlOrdenDetalle: string = 'http://localhost:8085/api/ordenesdetalle';
  
  constructor(private http: HttpClient) { }

  getResultadosRequest(url= "http://localhost:8086/api/resultados"): Observable<Resultados[]> {
    return this.http.get<Resultados[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  eliminarResultadoPorId(id: number): Observable<Resultados> {
  const url = `${this.apiUrlResultados}/${id}`;
  return this.http.delete<Resultados>(url);
}

addResultado(resultado: Omit<Resultados, 'idResultados'>): Observable<Resultados> {
  const url = `${this.apiUrlResultados}/add`;
  return this.http.post<Resultados>(url, resultado)
    .pipe(
      catchError((error: any) => {
        console.error('Error al agregar el resultado', error);
        return throwError('Error al agregar el resultado');
      })
    );
}

actualizarResultado(id: number, input: Resultados): Observable<Resultados> {
  const url = `${this.apiUrlResultados}/${id}`;
  return this.http.put<Resultados>(url, input);
}

  getOrdenesById(idsOrden: number[]): Observable<(Orden | null)[]> {
    const url = `${this.apiUrlOrden}/orden/{id}`;
    const requests: Observable<Orden | null>[] = [];
  
    idsOrden.forEach(id => {
      const request = this.http.get<Orden>(url.replace('{id}', id.toString())).pipe(
        catchError(() => of(null))
      );
      requests.push(request);
    });
  
    return forkJoin(requests);
  }

  getExamenesById(idsExamen: number[]): Observable<(Examen | null)[]> {
    const url = `${this.apiUrlExamen}/examenById/{id}`;
    const requests: Observable<Examen | null>[] = [];

    idsExamen.forEach(id => {
      const request = this.http.get<Examen>(url.replace('{id}', id.toString())).pipe(
        catchError(() => of(null))
      );
      requests.push(request);
    });

    return forkJoin(requests);
  }

  getOrdenesByIdTipoOrden(idsOrden: number[]): Observable<(OrdenDetalle | null)[]> {
    const url = `${this.apiUrlOrdenDetalle}/orden/{id}`;
    const requests: Observable<OrdenDetalle[] | null>[] = [];
  
    idsOrden.forEach(id => {
      const request = this.http.get<OrdenDetalle[]>(url.replace('{id}', id.toString())).pipe(
        catchError(() => of(null))
      );
      requests.push(request);
    });
  
    return forkJoin(requests).pipe(
      map(ordenes => ordenes.flat())
    );
  }

  searchResultadosByAlphaCode(code: string): Observable<Resultados | null>{
    const url = `${this.apiUrlResultados}/alpha/${code}`;
   return this.http.get<Resultados[]>(url)
   .pipe(
      map((resultados: string | any[]) => resultados.length > 0 ? resultados[0]: null),
      catchError( () => of(null))
    );
   }
   
   searchByTipoOrden(tipoorden: number, idAreaExamen: number): Observable<Resultados[]> {
    const urlOrdenes = `${this.apiUrlOrden}/tipo/${tipoorden}`;
  
    return this.http.get<Orden[]>(urlOrdenes).pipe(
      switchMap((ordenes: Orden[]) => {
        const idsOrden = ordenes.map(orden => orden.idOrden);
  
        if (idsOrden.length === 0) {
          return of([]);
        }
  
        const urlResultadosFiltrados = `${this.apiUrlResultados}/ordenes/${idsOrden.join(',')}`;
  
        return this.http.get<Resultados[]>(urlResultadosFiltrados).pipe(
          switchMap((resultados: Resultados[]) => {
            const idExamenes = resultados.map(resultado => resultado.idExamen);
  
            if (idExamenes.length === 0) {
              return of([]);
            }
  
            const urlExamenesFiltrados = `${this.apiUrlExamen}/AreaExamen/${idAreaExamen}`;
  
            return this.http.get<Examen[]>(urlExamenesFiltrados).pipe(
              map((examenes: Examen[]) => {
                const idExamenesFiltrados = examenes.map(examen => examen.idExamen);
  
                // Filtrar los resultados por idExamen en los examenes filtrados
                const resultadosFiltrados = resultados.filter(resultado => idExamenesFiltrados.includes(resultado.idExamen));
  
                return resultadosFiltrados;
              })
            );
          })
        );
      }),
      catchError(() => of([]))
    );
  }

    ListadoOrdenesConExamenes(): Observable<OrdenDetalle[]> {
    const url = `${this.apiUrlOrdenDetalle}`;
  
    return this.http.get<OrdenDetalle[]>(url).pipe(
      catchError(() => of([]))
    );
  }

  getResultadosByOrdenAndExamen(ordenId: number, examenId: number): Observable<Resultados[]> {
    return this.getResultadosRequest()
      .pipe(
        map(resultados => resultados.filter(resultado => resultado.idOrden === ordenId && resultado.idExamen === examenId))
      );
  }
  
}