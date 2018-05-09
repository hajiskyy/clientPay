import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { of } from "rxjs/Observable/of";
import {Observable} from 'rxjs';
import { Employee } from "../models/employee";


@Injectable()
export class EmployeeService {
  employee: Employee;

  private employeeSource = new BehaviorSubject<Employee>({
    id: null,
    FirstName: null,
    LastName: null,
    department: null,
    role: null,
    salary: null
  });
  selectedEmployee = this.employeeSource.asObservable();

  constructor(
    private http: HttpClient
  ) { 
    
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>("http://localhost:3000/employees");
  }

  getEmployeeById(id: string): Observable<Employee>{
    return this.http.get<Employee>(`http://localhost:3000/employees/${id}`);
  }

  addEmployee(employee: Employee){
    return this.http.post<Employee>("http://localhost:3000/employees",employee);
  }

  updateEmployee(employee: Employee){
    return this.http.put<Employee>(`http://localhost:3000/employees/${employee.id}`,employee);
  }

  setFormEmployee(employee: Employee) {
    this.employeeSource.next(employee);
  }

}
