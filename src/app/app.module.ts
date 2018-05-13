import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule, AngularFireAuthProvider } from "angularfire2/auth";
import { environment } from '../environments/environment.prod';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeeService } from './services/employee.service';
import { WorkService } from './services/work.service';
import { EmployeesComponent } from './components/employees/employees.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthServiceService } from './services/auth-service.service';
import { CompanyService } from './services/company.service';
import { GuardGuard } from './services/guard.guard';

const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [GuardGuard]},
  {path: 'employee/:id', component: ViewEmployeeComponent, canActivate: [GuardGuard]},
  {path: 'employees', component: EmployeesComponent, canActivate: [GuardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add', component: AddEmployeeComponent, canActivate: [GuardGuard] },
  {path:'', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo:'/login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddEmployeeComponent,
    DashboardComponent,
    NavbarComponent,
    EmployeesComponent,
    ViewEmployeeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseApp, 'clientPay'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService, WorkService, AuthServiceService, CompanyService,AngularFireAuthProvider, GuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
