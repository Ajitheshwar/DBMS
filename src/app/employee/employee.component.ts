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
        }
      },
      err=>{ console.log("err in getting employee details",err)}
    )
  }
  
 
}
