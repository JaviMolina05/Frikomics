import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ComicsProductosComponent } from './components/Productos/comics-productos/comics-productos.component';
import { LoginComponent } from './components/Login/login/login.component';
import { RegisterComponent } from './components/Login/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productos', component: ComicsProductosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent } // Ruta para el registro
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
