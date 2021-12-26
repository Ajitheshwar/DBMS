import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DBMS';

  constructor(private router : Router){}
  btnVar=true

  admin(){
    this.btnVar=false
  }
  LogOut(){
    this.btnVar=true
    this.router.navigateByUrl("")
  }
}


