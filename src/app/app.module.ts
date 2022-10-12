import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/////////////////
/// TEMPLATES ///
/////////////////

import { IndexComponent } from './components/index/index.component';
import { LoaderComponent } from './components/loader/loader.component';


////////////////
/// Services ///
////////////////

import { DataService } from './services/data.service';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { WorkComponent } from './components/work/work.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoaderComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    AboutComponent,
    WorkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
