import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Work } from "../models/work";
import { Hours } from "../models/hours";

@Injectable()
export class WorkService {
   active: Work[];
  constructor(
    private http: HttpClient
  ) { 
    this.active = [];
  }

  setActive(active){
    localStorage.setItem('active',JSON.stringify(this.active));    
  }

  getActives(){
    if(localStorage.getItem('active')){
      this.active = JSON.parse(localStorage.getItem('active'));
    }
    return this.active;
  }

  done(active: Work): Observable<Hours>{
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
    return this.http.post<Hours>("http://localhost:3000/worked_hours",newHoursWorked);
  }

}
