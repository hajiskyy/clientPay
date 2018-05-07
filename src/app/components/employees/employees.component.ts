import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { Employee } from "../../models/employee";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  loaded: boolean;
  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.loaded = false;
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.loaded = true;
    })
  }

}
