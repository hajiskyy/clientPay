import { Component, OnInit } from '@angular/core';
import { Employee } from "../../models/employee";
import { Work } from "../../models/work";
import { EmployeeService } from "../../services/employee.service";
import { WorkService } from "../../services/work.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees: Employee[];
  active: Work[];
  constructor(
    private employeeService: EmployeeService,
    private workService: WorkService
  ) { }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees()
    this.active = this.workService.getActives()
  }

  setActive(e, employee){
    e.preventDefault();
    e.target.classList.add("disabled");
    this.workService.setActive({
      employee: employee,
      status: "working",
      date: new Date(),
      startTime: new Date,
      endTime: new Date()
    });
  }

  done(e, employee){
    e.preventDefault();
    this.workService.setActive(employee);
  }

}
