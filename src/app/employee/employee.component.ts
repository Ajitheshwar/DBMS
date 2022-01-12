import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private ps : ProductsService) { }

  searchTerm : string
  employee


  ngOnInit(): void {
    this.getAllEmployeeDetails()
    
  }

  getAllEmployeeDetails(){
    
    this.ps.getEmployee().subscribe(
      res=>{
        this.employee=res["message"]
        
        for(let e of this.employee){
          e.Join_Date= new Date(e.Join_Date).toDateString().split(' ').slice(1).join(' ')
          e.edit = false;
        }
      },
      err=>{ console.log("err in getting employee details",err)}
    )
  }
  
  deleteEmployee(e)
  {
    e.delete = true;
    console.log(e)
    if (window.confirm(`Do you want to remove Employer ${e.Employee_Name} with id ${e.Employee_ID}?`))
    {   
      this.ps.deleteEmployee(e).subscribe(
        res=>{alert(res["message"])},
        err=>{alert(`Employer ${e.Employee_Name} with id ${e.Employee_ID} cannot be deleted`)}
      )
    }
    
  }

  editEmployee(e)
  {
    e.edit=true
    this.x.email=e.Emp_Email
    this.x.phone=e.phone
    this.x.altphone=e.alt_phone
  }
 
  x = {
    email : "",
    phone  : "",
    altphone :""
  }

  saveEmployeeDetails(e)
  {
    e.Emp_Email=this.x.email
    e.phone=this.x.phone
    e.alt_phone=this.x.altphone
    e.delete = false;
    this.ps.saveEmployee(e).subscribe(
      res=>{alert(`${e.Employee_Name} with ${e.Employee_ID} details are successfully updated !!!`)}
    )
    e.edit=false
  }

  cancelEditEmployee(e)
  {
    e.edit=false
  }
}
