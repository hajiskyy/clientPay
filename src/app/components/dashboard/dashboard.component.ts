import { Component, OnInit } from '@angular/core';
import { Employee } from "../../models/employee";
import { Work } from "../../models/work";
import { Hours } from "../../models/hours";
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
  loaded: boolean;
  constructor(
    private employeeService: EmployeeService,
    private workService: WorkService
  ) { }

  ngOnInit() {
    this.loaded = false;
    //get employees from server
    this.getEmployeesInit();
    this.getActives();
  }

  //init get employees
  getEmployeesInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.loaded = true;
      //get localStorage
      this.getEmployees();
    });
  }
  // save inactive employees to locaStorage
  storeEmployees(employees) {
    localStorage.setItem('inactive', JSON.stringify(employees));
  }
  //get inactive from Localstorage
  getEmployees() {
    if (localStorage.getItem('inactive')) {
      this.employees = JSON.parse(localStorage.getItem('inactive'));
    }
  }

  //Set Active employees
  setActive(e, employee) {
    e.preventDefault();
    //set inactive employees
    this.getEmployees();

    this.employees.forEach((emp, index) => {
      if (emp.id === employee.id) {
        this.employees.splice(index, 1);
      }
    });

    //save inactive employees changes
    this.storeEmployees(this.employees);
    // get inactive employees due to changes
    this.getEmployees();

    // new active employee
    let active: Work;
    active = {
      employee: employee,
      status: "working",
      date: new Date(),
      startTime: new Date,
      endTime: new Date()
    }
    // get actives
    this.getActives();
    
    // add actives
    this.active.push(active);
    // Set As Active
    this.workService.setActive(this.active);

    //get Actives
    this.getActives()
  }
  getActives(){
    this.active = this.workService.getActives();
  }
 



  done(e, active) {
    e.preventDefault();
    this.workService.done(active).subscribe(
      res => {
        if (res.employee) {
          this.getActives();
          //Success message
        } else {
          //Fail message
        }
      }
    )
  }

}
