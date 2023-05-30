import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ResultadosService } from '../../services/resultados.service';
import { Resultados } from '../../interfaces/results';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultado-page',
  templateUrl: './resultado-page.component.html',
  styles: [
  ]
})
export class ResultadoPageComponent implements OnInit{
  public resultados?: Resultados;

  constructor(private activedRoute:ActivatedRoute, private router: Router, private resultadoService: ResultadosService){}

  ngOnInit(): void {
      this.activedRoute.params.pipe(
        switchMap( ({id}) => this.resultadoService.searchResultadosByAlphaCode(id)), ).subscribe(resultado => {
          if (!resultado){
            return this.router.navigateByUrl('');
          }
          console.log('Tenemos resultado');
          return this.resultados = resultado;
        })
  }

}
