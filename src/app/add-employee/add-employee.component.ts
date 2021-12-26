import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private ps : ProductsService, private router : Router) { }

  ngOnInit(): void {
  }
  employeeDetails(ref){
    let d=new Date()
    let today = String(d.getFullYear())+'-'+String(d.getMonth()+1)+'-'+String(d.getDate())
    
    let obj ={ename : ref.value.ename, designation : ref.value.designation, empEmail : ref.value.empEmail, ephone1 : ref.value.ephone1, ephone2:ref.value.ephone2,date : today}
    console.log(obj)
    this.ps.addEmployee(obj).subscribe(
      res=>{alert(res["message"])},
      err=>{console.log("error in subscribing add Employee",err)}
    )
    this.router.navigateByUrl("/admin/employee")
    ref.reset()
  }

}
