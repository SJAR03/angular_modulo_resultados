import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Resultados, Orden } from '../interfaces/results';

@Injectable({providedIn: 'root'})
export class ResultadosService {

  private apiUrlResultados: string = 'http://localhost:8086/api/resultados';
  private apiUrlOrden: string = 'http://localhost:8084/api/ordenes';

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
   
   searchByCita(cita: number): Observable<Resultados[]> {
    const urlOrdenes = `${this.apiUrlOrden}/tipo/${cita}`; // URL para obtener las órdenes filtradas por IdTipoOrden
  
    return this.http.get<Orden[]>(urlOrdenes).pipe(
      switchMap((ordenes: Orden[]) => {
        // Obtener los IdOrden de las órdenes filtradas
        const idsOrden = ordenes.map(orden => orden.idOrden);
  
        console.log(idsOrden);
  
        if (idsOrden.length === 0) {
          // No hay órdenes con el IdTipoOrden dado, devolver un arreglo vacío
          return of([]);
        }
  
        // Verificar si todos los IdOrden son válidos
        if (idsOrden.some(id => id === undefined || id === null)) {
          console.error('Algunos objetos de orden no tienen la propiedad IdOrden válida');
          return of([]);
        }
  
        // Construir la URL para obtener los resultados por los IdOrden filtrados
        const urlResultadosFiltrados = `${this.apiUrlResultados}/ordenes/${idsOrden.map(String).join(',')}`;
        console.log(urlResultadosFiltrados);
  
        return this.http.get<Resultados[]>(urlResultadosFiltrados);
      }),
      catchError(() => of([]))
    );
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

