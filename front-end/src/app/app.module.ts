import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { BannerComponent } from './components/banner/banner.component';
import { HrComponent } from './components/utilities/hr/hr.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexComponent } from './components/index/index.component';
import { Error404Component } from './components/error404/error404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// import { LoginComponent } from './components/login/login.component';
import { SiteMapComponent } from './components/site-map/site-map.component';
import { StudiesComponent } from './components/studies/studies.component';
import { NetworksComponent } from './components/networks/networks.component';
import { ModalLoginComponent } from './components/modals/modal-login/modal-login.component';
import { ModalEditProjectComponent } from './components/modals/modal-edit-project/modal-edit-project.component';
import { ModalAddProjectComponent } from './components/modals/modal-add-project/modal-add-project.component';
import { ModalDeleteProjectComponent } from './components/modals/modal-delete-project/modal-delete-project.component';
//import { StorageService } from './services/storage.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImagenComponent,
    BannerComponent,
    HrComponent,
    AboutMeComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactMeComponent,
    FooterComponent,
    IndexComponent,
    Error404Component,
    NavbarComponent,
    // LoginComponent,
    SiteMapComponent,
    StudiesComponent,
    NetworksComponent,
    ModalLoginComponent,
    ModalEditProjectComponent,
    ModalAddProjectComponent,
    ModalDeleteProjectComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
