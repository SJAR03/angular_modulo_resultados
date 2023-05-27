import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, pipe } from 'rxjs';
import { Resultados } from '../interfaces/resultados';

@Injectable({providedIn: 'root'})
export class ResultadosService {

private apiUrl:string = 'http://localhost:8082/api/resultados';

  constructor(private http: HttpClient) { }

  private getResultadosRequest(url: string): Observable<Resultados[]>{
   return this.http.get<Resultados[]>(url)
     .pipe(
     catchError( () => of([]))
    );
  }

  searchResultadosByAlphaCode(code: string): Observable<Resultados | null>{
   const url = `${this.apiUrl}/alpha/${code}`;
  return this.http.get<Resultados[]>(url)
  .pipe(
     map(resultados => resultados.length > 0 ? resultados[0]: null),
     catchError( () => of(null))
   );
  }

  searchByTipoOrden( region: string): Observable<Resultados[]>{
    const url = `${this.apiUrl}/tipoorden/${region}`;
   return this.getResultadosRequest(url);
   }
 }
