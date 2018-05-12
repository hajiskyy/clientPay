import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { CompanyService } from "../../services/company.service";
import { AuthServiceService } from "../../services/auth-service.service";
import * as M from "materialize-css/dist/js/materialize";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  toastHTML: string;
  constructor(
    private companyService: CompanyService,
    private auth: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  emailVerification(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  onLogin(){
    if(this.emailVerification(this.email)){
      this.auth.login(this.email, this.password)
        .then(res => {
          this.router.navigate(['/dashboard']);
        
        })
        .catch(err => {
          this.toastHTML = err.message;
          M.toast({ html: this.toastHTML, displayLength: 2000 });
        })
    }
  }

}
