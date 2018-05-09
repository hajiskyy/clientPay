import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { EmployeeService } from "../../services/employee.service";
import { WorkService } from "../../services/work.service";
import { Employee } from "../../models/employee";
import { Work } from "../../models/work";

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private workService: WorkService
  ) { }
  employee: Employee;
  work: Work;
  loaded: boolean;
  hoursThisMonth: number;
  dueMonth: number;
  hoursPerYear: number;
  dueYear: number;
  allTimeHours: number;
  dueAllTime: number;
  ngOnInit() {
    this.hoursThisMonth = 30;
    this.hoursPerYear = 400;
    this.allTimeHours = 3000;
    this.loaded = false;
    this.activated.params.subscribe(param => {
      this.employeeService.getEmployeeById(param.id).subscribe(employee => {
        this.employee = employee;
        let salary = this.employee.salary
        this.dueMonth = this.hoursThisMonth * salary;
        this.dueYear = this.hoursPerYear * salary;
        this.dueAllTime = this.allTimeHours * salary;
        this.loaded = true;
      })
    })
  }

  onEdit(employee: Employee){
   this.employeeService.setFormEmployee(employee);
   this.router.navigate(["/add"]);
  }

}
