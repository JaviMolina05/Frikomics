import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/Login/login/login.component';
import { RegisterComponent } from './components/Login/register/register.component';
import { ComicListComponent } from './components/Productos/comic-list/comic-list.component';
import { ComicsProductosComponent } from './components/Productos/comics-productos/comics-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ComicListComponent,
    ComicsProductosComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
