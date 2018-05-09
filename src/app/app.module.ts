import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeeService } from './services/employee.service';
import { WorkService } from './services/work.service';
import { EmployeesComponent } from './components/employees/employees.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';

const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'employee/:id', component: ViewEmployeeComponent},
  {path: 'employees', component: EmployeesComponent},
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
    NavbarComponent,
    EmployeesComponent,
    ViewEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'clientPay'),
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService, WorkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
