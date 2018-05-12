import { Component, OnInit } from '@angular/core';
import { Employee } from "../../models/employee";
import { Work } from "../../models/work";
import { Hours } from "../../models/hours";
import { EmployeeService } from "../../services/employee.service";
import { WorkService } from "../../services/work.service";
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  inactiveEmployees: Employee[];
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
      // check in inactive already exists
      if(localStorage.getItem('inactive')){
        this.inactiveEmployees = this.getInactiveEmployees();
      }else{
        this.inactiveEmployees = employees;
      }
      
      this.loaded = true;
    });
  }
  // save inactive employees to locaStorage
  storeEmployees(employees: Employee[]) {
    this.workService.StoreInactives(employees);
  }
  //get inactive from Localstorage
  getInactiveEmployees() {
    return this.workService.getInactive()
  }
  getActives(){
    this.active = this.workService.getActives();
  }

  //Set Active employees
  setActive(e, employee) {
    e.preventDefault();
    this.inactiveEmployees.forEach((emp, index) => {
      if (emp.id === employee.id) {
        this.inactiveEmployees.splice(index, 1);
      }
    });

    //save inactive employees changes
    this.storeEmployees(this.inactiveEmployees);

    // get inactive employees due to changes
    this.inactiveEmployees = this.getInactiveEmployees();

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
  done(e, active) {
    e.preventDefault();
    this.workService.done(active);
    this.getActives();
  }

  onHover(){
    let elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems, {});
  }

  reset(){
    localStorage.removeItem('inactive');
    localStorage.removeItem('active');
    window.location.reload();
  }

}
