import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Router } from '@angular/router';
import { deepEqual } from 'assert';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private ps : ProductsService,private router : Router) { }

  details : boolean =false
  purchase =[]
  customers=[]
  today


  ngOnInit(): void {
    
    
    let d=new Date()
    this.today = String(d.getFullYear())+'-'+String(d.getMonth()+1)+'-'+String(d.getDate())
    this.ps.getCustomersByDate(this.today).subscribe(
    res=>{
      this.customers=res["message"]
      for(let c of this.customers){
        c.CDate=new Date(c.CDate).toDateString().split(' ').slice(1).join(' ')        
      }
    },
      err=>{console.log("err in reading today's customers",err)}
    )
    console.log(this.today)
    console.log(this.customers)
  }

  


  customerPurchases={customer : {},purchaseList : {}}
  customerDetails(ref){
    this.details=true

    console.log(ref.value,this.today)
    let obj={cname : ref.value.name, date : this.today}
    this.customerPurchases.customer=obj;
  }


  purchases(ref1){
    console.log(ref1.value)
    this.purchase.push(ref1.value)
    ref1.reset()
  }
  
  update(){

    this.customerPurchases.purchaseList=this.purchase;
    console.log(this.purchase)
    console.log(this.customerPurchases)

    this.ps.updateCustomer(this.customerPurchases).subscribe(
      res=>{alert(res["message"])}
    )
    this.purchase=[]
  }



  refresh(){
    console.log(this.today)
    this.ps.getCustomersByDate(this.today).subscribe(
      res=>{this.customers=res["message"]},
      err=>{console.log("err in reading today's customers",err)}
    )
  }

  getDetailsByDate(value){
    console.log(value)
    let date = value.yyyy+"-"+value.mm+"-"+value.dd;
    console.log(date)
    this.ps.getCustomersByDate(date).subscribe(
      res=>{this.customers=res["message"]},
      err=>{console.log("err in reading today's customers",err)}
    )
  }



  customerPurchaseDetails(index){
    
    let id = this.customers[index].Customer_ID
    
    //console.log(id)
    this.router.navigateByUrl("/admin/customer/"+id)
  }

}
