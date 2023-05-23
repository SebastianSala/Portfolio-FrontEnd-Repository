import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { BannerComponent } from './components/banner/banner.component';
import { HrComponent } from './components/utilities/hr/hr.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IndexComponent } from './components/index/index.component';
import { Error404Component } from './components/error404/error404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SiteMapComponent } from './components/site-map/site-map.component';
import { StudiesComponent } from './components/studies/studies.component';
import { NetworksComponent } from './components/network/network.component';
import { ModalLoginComponent } from './components/modals/modal-login/modal-login.component';
import { ModalEditProjectComponent } from './components/modals/modal-edit-project/modal-edit-project.component';
import { ModalAddProjectComponent } from './components/modals/modal-add-project/modal-add-project.component';
import { ModalDeleteProjectComponent } from './components/modals/modal-delete-project/modal-delete-project.component';
import { ModalLogoutComponent } from './components/modals/modal-logout/modal-logout.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { ModalEditAboutMeComponent } from './components/modals/modal-edit-about-me/modal-edit-about-me.component';
import { ModalEditBannerComponent } from './components/modals/modal-edit-banner/modal-edit-banner.component';
import { ModalAddNetworkComponent } from './components/modals/modal-add-network/modal-add-network.component';
import { ModalDeleteNetworkComponent } from './components/modals/modal-delete-network/modal-delete-network.component';
import { ModalEditNetworkComponent } from './components/modals/modal-edit-network/modal-edit-network.component';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsAR from '@angular/common/locales/es-AR';
import { ModalAddExperienceComponent } from './components/modals/modal-add-experience/modal-add-experience.component';
import { ModalEditExperienceComponent } from './components/modals/modal-edit-experience/modal-edit-experience.component';
import { ModalDeleteExperienceComponent } from './components/modals/modal-delete-experience/modal-delete-experience.component';

// Register the 'es-AR' locale data
registerLocaleData(localeEsAR);


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
    SiteMapComponent,
    StudiesComponent,
    NetworksComponent,
    ModalLoginComponent,
    ModalEditProjectComponent,
    ModalAddProjectComponent,
    ModalDeleteProjectComponent,
    ModalLogoutComponent,
    NewUserComponent,
    ModalEditAboutMeComponent,
    ModalEditBannerComponent,
    ModalAddNetworkComponent,
    ModalDeleteNetworkComponent,
    ModalEditNetworkComponent,
    ModalAddExperienceComponent,
    ModalEditExperienceComponent,
    ModalDeleteExperienceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
