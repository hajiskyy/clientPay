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
  employees: Observable<Employee[]>;
  employee: Observable<Employee>
  employeeCollection: AngularFirestoreCollection<Employee>;
  employeeDocument: AngularFirestoreDocument<Employee>

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
    
    this.employeeCollection = this.db.collection('employee', ref => ref.orderBy('salary', 'desc'));
   this.employees = this.employeeCollection.snapshotChanges().map(changes => {
     return changes.map(a => {
       const data = a.payload.doc.data() as Employee;
       data.id = a.payload.doc.id;
       return data;
     });
   });
}

  getEmployees(){
    return this.employees;
  }

  getEmployeeById(id: string){
    this.employeeDocument = this.db.doc<Employee>(`employee/${id}`);
    this.employee = this.employeeDocument.snapshotChanges().map(changes => {
      
      let data = changes.payload.data() as Employee;
       data.id = changes.payload.id;
       return data;
    })
     return this.employee;
  }

  addEmployee(employee: Employee){
     this.employeeCollection.add(employee);
  }

  updateEmployee(employee: Employee){
    this.employeeDocument = this.db.doc(`employee/${employee.id}`);
    this.employeeDocument.update(employee);
  }

  deleteEmployee(id: string){
    this.employeeDocument = this.db.doc(`employee/${id}`);
    this.employeeDocument.delete();
  }

  setFormEmployee(employee: Employee) {
    this.employeeSource.next(employee);
  }

}
