import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import * as M from "materialize-css/dist/js/materialize";

import { EmployeeService } from "../../services/employee.service";
import { WorkService } from "../../services/work.service";
import { Employee } from "../../models/employee";
import { Work } from "../../models/work";
import { Hours } from '../../models/hours';

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
  hoursThisYear: number;
  dueYear: number;
  allTimeHours: number;
  dueAllTime: number;
  ngOnInit() {
    this.hoursThisMonth = 30;
    this.hoursThisYear = 400;
    this.allTimeHours = 0;
    this.loaded = false;
    this.activated.params.subscribe(param => {
      this.employeeService.getEmployeeById(param.id).subscribe(employee => {
        this.employee = employee;
        this.workService.getWorkLogs(this.employee.id).subscribe(logs => {
          this.getHoursAllTime(logs); // calculate all time hours
          this.getHoursMonth(logs); // calculate month hours
          this.getHoursYear(logs); // calculate year hours
          let salary = this.employee.salary;
          this.dueMonth = this.hoursThisMonth * salary;
          this.dueYear = this.hoursThisYear * salary;
          this.dueAllTime = this.allTimeHours * salary;
          this.loaded = true;
        });
      });
    });
  }

  onEdit() {
    this.employeeService.setFormEmployee(this.employee);
    this.router.navigate(["/add"]);
  }

  onDelete() {
    this.employeeService.deleteEmployee(this.employee.id);
    let toastHTML = '<span>Employee deleted</span>';
    M.toast({ html: toastHTML, displayLength: 2000 });
    window.location.replace("http://localhost:4200/employees");
    
    // this.router.navigate(['/employees']);
    // this.workService.deleteWorkLog(this.employee.id).subscribe(res => {
    //   let toastHTML = '<span>Employee deleted</span>';
    //   M.toast({ html: toastHTML, displayLength: 2000 });
    //   this.router.navigate(['/employees']);
    // });
  }

  getHoursMonth(worked_hours: Hours[]) {
    let sum: number = 0;
    let today: Date = new Date("2018-05-08T18:31:05.935Z");
    worked_hours.forEach(logs => {
      let startTime: any = new Date(logs.startTime);
      let endTime: any = new Date(logs.endTime);

      //find which start dates belongs to this month
      if (startTime.getMonth() === today.getMonth() && startTime.getFullYear() === today.getFullYear()) {
        //find the difference
        let diffInMs: number = startTime - endTime;
        let diffInHours: number = diffInMs / 1000 / 60 / 60;
        //sum the hours difference
        sum += Math.floor(Math.abs(diffInHours));
      }
    });

    this.hoursThisMonth = sum;
  }
  getHoursYear(worked_hours: Hours[]) {
    let sum: number = 0;
    let today: Date = new Date();
    worked_hours.forEach(logs => {
      let startTime: any = new Date(logs.startTime);
      let endTime: any = new Date(logs.endTime);
      //find which start dates belongs to this year
      if (startTime.getFullYear() === today.getFullYear()) {
        //find the difference
        let diffInMs: number = startTime - endTime;
        let diffInHours: number = diffInMs / 1000 / 60 / 60;
        //sum the hours difference
        sum += Math.floor(Math.abs(diffInHours));
      }
    });

    this.hoursThisYear = sum;
  }

  getHoursAllTime(worked_hours: Hours[]) {
    let sum: number = 0;
    // sum the hours differnce of all time
    worked_hours.forEach(logs => {
      let startTime: any = new Date(logs.startTime);
      let endTime: any = new Date(logs.endTime);

      let diffInMs: number = startTime - endTime;
      let diffInHours: number = diffInMs / 1000 / 60 / 60;
      sum += Math.floor(Math.abs(diffInHours));
    });

    this.allTimeHours = sum;
  }

}
