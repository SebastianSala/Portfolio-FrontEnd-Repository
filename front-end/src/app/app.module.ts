import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ImagenComponent } from './components/imagen/imagen.component';

//import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImagenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
