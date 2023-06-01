import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { AddButtonComponent } from './components/add-button/add-button.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HomePageComponent,
    AboutPageComponent,
    SearchBoxComponent,
    AddButtonComponent
  ],
  declarations: [
    SidebarComponent,
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    SearchBoxComponent,
    AddButtonComponent
  ],
  providers: [],
})
export class SharedModule { }
