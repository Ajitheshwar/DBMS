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

  adminLogin(ref){
    if(ref.value.name=="ajitheshwar1923")
    {
      if(ref.value.password=="ajith1923")
      {
        this.btnVar=false;
        this.router.navigateByUrl('/admin')
      }
      else{
        alert("Invalid Password ")
      }
    }
    else{
      alert("Invalid Username")
    }
    
  }
  LogOut(){
    this.btnVar=true
    this.router.navigateByUrl("")
  }
}


