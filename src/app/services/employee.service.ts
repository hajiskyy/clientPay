import { Injectable } from '@angular/core';
import { Employee } from "../models/employee";

@Injectable()
export class EmployeeService {
  employees: Employee[];
  constructor() { 
    this.employees = [
      {
        id: "001",
        FirstName: "Haji",
        LastName: "Mohammed",
        department: "IT",
        role: "lead",
        salary: 5000
      },
      {
        id: "002",
        FirstName: "Kamal",
        LastName: "Umar",
        department: "Animation",
        role: "senior",
        salary: 8000
      }
    ];
  }

  getEmployees(){
    return this.employees
  }

  addEmployee(employee: Employee){
    this.employees.push(employee);
  }

}
