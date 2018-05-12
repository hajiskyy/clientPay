import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    const sideNav = document.querySelector('.sidenav');
    M.Sidenav.init(sideNav, {});

  }
  logOut(e){
    e.preventDefault();
    if(confirm("logging out will reset the active employees for a new day, Are you sure?")){
      localStorage.clear();
    }
    
  }
}
