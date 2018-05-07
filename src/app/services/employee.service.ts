import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs';
import { Employee } from "../models/employee";


@Injectable()
export class EmployeeService {
  constructor(
    private http: HttpClient
  ) { 
    
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>("http://localhost:3000/employees");
  }

  // addEmployee(employee: Employee){
  //   this.employees.push(employee);
  // }

}
