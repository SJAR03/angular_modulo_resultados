import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Resultados, Orden, Examen } from '../interfaces/results';

@Injectable({providedIn: 'root'})
export class ResultadosService {

  private apiUrlResultados: string = 'http://localhost:8086/api/resultados';
  private apiUrlOrden: string = 'http://localhost:8084/api/ordenes';
  private apiUrlExamen: string = 'http://localhost:8083/api/examenes';
  private apiUrlExamenCategoria: string = 'http://localhost:8084/api/examenes/CategoriaExamen/{id}'; //busca examenes segun un idCategoria, devuelve una lista
  
  constructor(private http: HttpClient) { }

  getResultadosRequest(url= "http://localhost:8086/api/resultados"): Observable<Resultados[]> {
    return this.http.get<Resultados[]>(url)
      .pipe(
        catchError(() => of([]))
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
   
   searchByTipoOrden(tipoorden: number, idCategoriaExamen: number): Observable<Resultados[]> {
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
  
            const urlExamenesFiltrados = `${this.apiUrlExamen}/CategoriaExamen/${idCategoriaExamen}`;
  
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
  
}
