import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { of } from "rxjs/Observable/of";
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Employee } from "../models/employee";


@Injectable()
export class EmployeeService {
  employees: Observable<any[]>;
  employeeCollection: AngularFirestoreCollection<Employee>
  snapshot: any;

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
    private http: HttpClient,
    public db: AngularFirestore
  ) { 
    db.firestore.settings({ timestampsInSnapshots: true });
    this.employeeCollection = this.db.collection('employee');
   this.employees = this.employeeCollection.valueChanges();
}

  getEmployees(){
    return this.employees;
  }

  getEmployeeById(id: string): Observable<Employee>{
    return this.http.get<Employee>(`http://localhost:3000/employees/${id}`);
  }

  addEmployee(employee: Employee){
    let id = this.db.createId()
    employee.id = id;
     this.employeeCollection.add(employee);
  }

  updateEmployee(employee: Employee){
    return this.http.put<Employee>(`http://localhost:3000/employees/${employee.id}`,employee);
  }
  deleteEmployee(employee: Employee){
    return this.http.delete<Employee>(`http://localhost:3000/employees/${employee.id}`);
  }

  setFormEmployee(employee: Employee) {
    this.employeeSource.next(employee);
  }

}
