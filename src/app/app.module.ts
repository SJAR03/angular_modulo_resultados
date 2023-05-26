import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ResultsModule } from './results/results.module';
import { SharedModule } from "./shared/shared.module";
import { ListaComponent } from './orden/lista/lista.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ResultsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
