import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  FirstName: string;
  LastName: string;
  department: string;
  role: string;
  salary: number;
  constructor() { }

  ngOnInit() {
  }

  //to validate names
  nameValidate(name: string) {
    let ex = /^[^0-9\\\/&]*$/;
    if (name != null) {
      if (name.match(ex) && (name.length >= 2 && name.length <= 30)) {
        return true
      }
    }
    return false;
  }

  // to validate department and role
  otherValidate(str: string) {
    let ex = /^[^\\\/&]*$/;
    if (str != null) {
      if (str.match(ex) && (str.length >= 2 && str.length <= 20)) {
        return true;
      }
    }
    return false

  }

  onSubmit() {
    if (
      this.FirstName != null ||
      this.LastName != null ||
      this.department != null ||
      this.role != null ||
      this.salary != null
    ) {
      if (this.nameValidate(this.FirstName)) {
        if (this.nameValidate(this.LastName)) {
          if (this.otherValidate(this.department)) {
            if (this.otherValidate(this.role)) {
              if (this.salary != null) {
                console.log('great');
              } else {
                let toastHTML = '<span>Check Salary</span>';
                M.toast({ html: toastHTML, displayLength: 2000 });
              }
            } else {
              let toastHTML = '<span>Check role</span>';
              M.toast({ html: toastHTML, displayLength: 2000 });
            }
          } else {
            let toastHTML = '<span>Check Department</span>';
            M.toast({ html: toastHTML, displayLength: 2000 });
          }
        } else {
          let toastHTML = '<span>Check Last Name</span>';
          M.toast({ html: toastHTML, displayLength: 2000 });
        }
      } else {
        let toastHTML = '<span>Check First Name</span>';
        M.toast({ html: toastHTML, displayLength: 2000 });
      }
    } else {
      let toastHTML = '<span>Please fill in all fields</span>';
      M.toast({ html: toastHTML, displayLength: 2000 });
    }

  }

}
