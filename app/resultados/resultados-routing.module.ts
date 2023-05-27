import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByTipoOrdenPageComponent } from './pages/by-tipoorden-page/by-tipoorden-page.component';

const routes: Routes=[
 
  {
    path:'by-tipoorden',
    component:ByTipoOrdenPageComponent
  }
 
 
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class ResultadosRoutingModule { }
