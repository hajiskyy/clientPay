import { Injectable } from '@angular/core';
import { Work } from "../models/work";

@Injectable()
export class WorkService {
   active: Work[]
  constructor() { 
    this.active = []
  }

  setActive(employee: Work){
    this.active.push(employee)
  }

  getActives(){
    return this.active;
  }

  done(newActive: Work){
    //find Employee
    this.active.forEach(emp => {
      if(emp.employee.id === newActive.employee.id){
        // set end time
        emp.endTime = new Date();
      }
    });
  }

}
