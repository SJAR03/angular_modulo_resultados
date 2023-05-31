import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Resultados, Orden } from '../interfaces/results';

@Injectable({providedIn: 'root'})
export class ResultadosService {

  private apiUrlResultados: string = 'http://localhost:8086/api/resultados';
  private apiUrlOrden: string = 'http://localhost:8084/api/ordenes';
  private apiUrlExamen: string = 'http://localhost:8084/api/examen';


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
   
   searchByTipoOrden(tipoorden: number, idExamen: number): Observable<Resultados[]> {
    const urlOrdenes = `${this.apiUrlOrden}/tipo/${tipoorden}`;
  
    return this.http.get<Orden[]>(urlOrdenes).pipe(
      switchMap((ordenes: Orden[]) => {
        const idsOrden = ordenes.map(orden => orden.idOrden);
  
        if (idsOrden.length === 0) {
          return of([]);
        }
  
        const urlResultadosFiltrados = `${this.apiUrlResultados}/ordenes/${idsOrden.join(',')}`;
  
        return this.http.get<Resultados[]>(urlResultadosFiltrados).pipe(
          map((resultados: Resultados[]) => {
            // Filtrar los resultados por idExamen
            const resultadosFiltrados = resultados.filter(resultado => resultado.idExamen === idExamen);
  
            console.log(resultados); // Verificar los resultados antes del filtrado
            console.log(resultadosFiltrados); // Verificar los resultados después del filtrado
  
            return resultadosFiltrados;
          })
        );
      }),
      catchError(() => of([]))
    );
  }
  
  
  
  searchByCita( cita: string): Observable<Resultados[]>{
    const url = `${this.apiUrlOrden}/emergencia/${cita}`;
   return this.getResultadosRequest(url);
   }

  searchByEmergencia( emergencia: string): Observable<Resultados[]>{
    const url = `${this.apiUrlOrden}/emergencia/${emergencia}`;
   return this.getResultadosRequest(url);
   }
   searchByRutina( rutina: string): Observable<Resultados[]>{
    const url = `${this.apiUrlOrden}/rutina/${rutina}`;
   return this.getResultadosRequest(url);
   }
 }

