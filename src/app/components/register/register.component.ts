import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { CompanyService } from "../../services/company.service";
import { AuthServiceService } from "../../services/auth-service.service";
import * as M from "materialize-css/dist/js/materialize";
import { Router } from "@angular/router";
import { Company } from '../../models/company';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  companyName: string;
  toastHTML: string;
  loaded: boolean

  constructor(
    private companyService: CompanyService,
    private auth: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loaded = true;

  }

  emailVerification(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  company(name: string) {
    if (name.length >= 2 && name.length <= 24) {
      return true
    } else {
      this.toastHTML = '<span>Company name mustbe between 2 to 20 characters</span>';
      M.toast({ html: this.toastHTML, displayLength: 2000 });
      return false
    }

  }

  onRegister(){
    if (this.emailVerification(this.email)) {
      if (this.company(this.companyName)) {
        this.companyService.getCompany(this.companyName).subscribe(company => {
          //if company exists
          if (company[0] !== undefined) {
            this.toastHTML = '<span>Company name already exists</span>';
            M.toast({ html: this.toastHTML, displayLength: 2000 });
          } else {
            this.loaded = false;
            this.auth.register(this.email, this.password)
              .then(res => {
                if(res){
                  this.loaded = true;
                  let newCompany:Company;
                  newCompany = {
                    name: this.companyName,
                    email: res.user.email
                  }
                  this.companyService.addCompany(newCompany);
                  this.router.navigate(["/login"]);
                }
              })
              .catch(err => {
                this.loaded = true;
                this.toastHTML = err.message;
                M.toast({ html: this.toastHTML, displayLength: 2000 });
              });
          }
        });
      }
    }
  }

}
