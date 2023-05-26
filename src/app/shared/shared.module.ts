import { NgModule } from '@angular/core';
import { SearchBoxComponent } from "./components/search-box/search-box.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@NgModule({
  imports: [
  ],
  exports: [
    SidebarComponent,
    SearchBoxComponent
  ],
  declarations: [
    SidebarComponent,
    SearchBoxComponent
  ],
  providers: [],
})
export class SharedModule { }