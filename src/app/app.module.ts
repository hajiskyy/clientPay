import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from "@angular/router";


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeeService } from './services/employee.service';
import { WorkService } from './services/work.service';

const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add', component: AddEmployeeComponent },
  {path:'', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo:'/dashboard'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddEmployeeComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService, WorkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
