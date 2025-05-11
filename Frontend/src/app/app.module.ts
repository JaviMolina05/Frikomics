import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Login/login/login.component';
import { ComicListComponent } from './components/Productos/comic-list/comic-list.component';
import { ComicsProductosComponent } from './components/Productos/comics-productos/comics-productos.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComicService } from './services/comic.service';
import { RegisterComponent } from './components/Login/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ComicListComponent,
    ComicsProductosComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ComicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
