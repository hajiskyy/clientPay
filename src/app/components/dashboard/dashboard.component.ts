import { Component, OnInit } from '@angular/core';
import { Employee } from "../../models/employee";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees: Employee[]
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
  }

}
