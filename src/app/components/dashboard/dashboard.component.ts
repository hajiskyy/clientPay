import { Component, OnInit } from '@angular/core';
import { Employee } from "../../models/employee";
import { Work } from "../../models/work";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees: Employee[];
  active: Work[];
  // worked: work[];
  constructor() { }

  ngOnInit() {
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

    this.active = [];
  } //ngOnInit

  setActive(e, employee){
    e.preventDefault();
    e.target.classList.add("disabled")
    this.active.push({
      employee: employee,
      status: "working",
      date: new Date(),
      startTime: new Date,
      endTime: new Date()
    });
  }
  
  done(e, employee){
    e.preventDefault();
    employee.endTime = new Date();
  }

}
