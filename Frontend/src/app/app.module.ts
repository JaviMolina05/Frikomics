import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // 👈 Asegúrate de importar esto

import { AppComponent } from './app.component';
import { LoginComponent } from './components/Login/login/login.component';
import { ComicListComponent } from './components/Productos/comic-list/comic-list.component';
import { ComicsProductosComponent } from './components/Productos/comics-productos/comics-productos.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ComicService } from './services/comic.service';
import { RegisterComponent } from './components/Login/register/register.component';
import { AuthInterceptor } from './services/auth/auth-interceptor.service';
import { MiCuentaComponent } from './components/cuenta/mi-cuenta/mi-cuenta.component';
import { FavoritosComponent } from './components/cuenta/favoritos/favoritos.component';
import { HitorialPedidosComponent } from './components/cuenta/hitorial-pedidos/hitorial-pedidos.component';
import { SidebarComponent } from './components/cuenta/sidebar/sidebar.component';
import { ComicsAdminComponent } from './components/Productos/comics-admin/comics-admin.component';  // 👈 importa tu interceptor

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ComicListComponent,
    ComicsProductosComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    MiCuentaComponent,
    FavoritosComponent,
    HitorialPedidosComponent,
    SidebarComponent,
    ComicsAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ComicService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // 👈 permite múltiples interceptores
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
