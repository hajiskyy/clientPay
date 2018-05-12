import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  toastHTML: string;
  constructor(
    public auth: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    const sideNav = document.querySelector('.sidenav');
    M.Sidenav.init(sideNav, {});
  }
  logOut(e) {
    e.preventDefault();
    if (confirm("logging out will reset the active employees for a new day, Are you sure?")) {
      localStorage.clear();
      this.auth.logOut()
        .then(res => {
          this.toastHTML = "Log Out successful";
          M.toast({ html: this.toastHTML, displayLength: 2000 });
          this.router.navigate(['/login']);
        })
        .catch(err => {
          this.toastHTML = err.message;
          M.toast({ html: this.toastHTML, displayLength: 2000 });
        })
    }

  }
}
