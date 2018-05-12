import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { of } from "rxjs/Observable/of";
import { Observable } from "rxjs";
import { Work } from "../models/work";
import { Hours } from "../models/hours";
import { Employee } from '../models/employee';

@Injectable()
export class WorkService {
   active: Work[];
   hours_worked: Observable<Hours[]>;
   hour_worked: Observable<Hours>
   hours_workedCollection: AngularFirestoreCollection<Hours>
   hours_workedDocument: AngularFirestoreDocument<Hours>

  constructor(
    private http: HttpClient,
    public db: AngularFirestore
  ) { 
    this.active = [];
    this.hours_worked

  }

  setActive(active){
    localStorage.setItem('active',JSON.stringify(this.active));    
  }

  addInactive(newEmployee: Employee){
    let inactive: Employee[] = [];
    if(localStorage.getItem('inactive')){
      inactive = JSON.parse(localStorage.getItem('inactive')); 
    }
    inactive.push(newEmployee);
    localStorage.setItem('inactive', JSON.stringify(inactive));
  }
  StoreInactives(newEmployees: Employee[]){
    let inactive: Employee[] = [];
      newEmployees.forEach(employee => {
        inactive.push(employee);
      });
      
    localStorage.setItem('inactive', JSON.stringify(inactive));
  }

  getInactive(){
    let inactive: Employee[] = [];
    if(localStorage.getItem('inactive')){
      inactive = JSON.parse(localStorage.getItem('inactive')); 
    }
    return inactive;
  }

  getActives(){
    if(localStorage.getItem('active')){
      this.active = JSON.parse(localStorage.getItem('active'));
    }
    return this.active;
  }

  done(active: Work){
    //remove active employee from localstorage
    this.getActives();
    this.active.forEach((employee, index) => {
      if(employee.employee.id === active.employee.id){
        this.active.splice(index, 1);
      }
    });
     this.setActive(this.active);
    
    let newHoursWorked: Hours;
    newHoursWorked = {
      employee: active.employee.id,
      date: active.date,
      startTime: active.startTime,
      endTime: new Date()
    }
    this.hours_workedCollection = this.db.collection('hours_worked');

    this.hours_workedCollection.add(newHoursWorked);
    
  }

  getWorkLogs(id: string){
    this.hours_workedCollection = this.db.collection('hours_worked', ref => ref.where("employee","==", `${id}`));

    this.hours_worked = this.hours_workedCollection.valueChanges();
    
    return this.hours_worked;
  }

  deleteWorkLog(id: string){

    //cant seem to delete a collection
    this.hours_workedCollection = this.db.collection('hours_worked', ref => ref.where('employee', '==',`${id}`))
    this.hours_workedCollection.doc('hours_worked').delete();
  }

}
