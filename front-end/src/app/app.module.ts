import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { BannerComponent } from './components/banner/banner.component';
import { HrComponent } from './shared/utilities/hr/hr.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectComponent } from './components/project/project.component';
import { SkillComponent } from './components/skill/skill.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IndexComponent } from './components/index/index.component';
import { Error404Component } from './components/error404/error404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SiteMapComponent } from './shared/site-map/site-map.component';
import { EducationComponent } from './components/education/education.component';
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
import { CustomCardComponent } from './shared/utilities/custom-card/custom-card.component';
import { AddEntityComponent } from './shared/utilities/add-entity/add-entity.component';
import { ModalAddEducationComponent } from './components/modals/modal-add-education/modal-add-education.component';
import { ModalEditEducationComponent } from './components/modals/modal-edit-education/modal-edit-education.component';
import { ModalDeleteEducationComponent } from './components/modals/modal-delete-education/modal-delete-education.component';
import { ModalAddSkillComponent } from './components/modals/modal-add-skill/modal-add-skill.component';
import { ModalDeleteSkillComponent } from './components/modals/modal-delete-skill/modal-delete-skill.component';
import { ModalEditSkillComponent } from './components/modals/modal-edit-skill/modal-edit-skill.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

import { httpInterceptorProviders } from './services/interceptor.service';

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
    ProjectComponent,
    SkillComponent,
    ContactMeComponent,
    FooterComponent,
    IndexComponent,
    Error404Component,
    NavbarComponent,
    SiteMapComponent,
    EducationComponent,
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
    ModalDeleteExperienceComponent,
    CustomCardComponent,
    AddEntityComponent,
    ModalAddEducationComponent,
    ModalEditEducationComponent,
    ModalDeleteEducationComponent,
    ModalAddSkillComponent,
    ModalDeleteSkillComponent,
    ModalEditSkillComponent,
    DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorProviders
    // { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
