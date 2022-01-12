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
  isSubmitted

  ngOnInit(): void {
    
    this.isSubmitted = false;
    let d=new Date()
    this.today = String(d.getFullYear())+'-'+String(d.getMonth()+1)+'-'+String(d.getDate())
    this.ps.getCustomersByDate(this.today).subscribe(
    res=>{
      this.customers=res["message"]
      this.changeDate()
    },
      err=>{console.log("err in reading today's customers",err)}
    )
    console.log(this.today)
    console.log(this.customers)
  }

  
  changeDate()
  {
    for(let c of this.customers){
      c.CDate=new Date(c.CDate).toDateString().split(' ').slice(1).join(' ')        
    }
  }

  customerPurchases={customer : {},purchaseList : {}}
  customerDetails(ref){
    this.details=true

    console.log(ref.value,this.today)
    let obj={cname : ref.value.name, date : this.today}
    this.customerPurchases.customer=obj;
  }

  products 
  purchases(ref1){
    if(ref1.form.valid)
    {
      this.ps.products.subscribe(values =>{this.products = values})
      let x = false
      for(let p of this.products)
      {
        if(p.Product_ID==ref1.value.pid)
        {
          x=true;
          break; 
        }
      }
      if(x)
      {
        this.purchase.push(ref1.value)
        ref1.reset()
      }
      else
      {
        alert(`Product with ID ${ref1.value.pid} is not avaible`)
      }
    }
    else
    {
      this.isSubmitted = true;
    }
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
      res=>{
        this.customers=res["message"]
        this.changeDate()
      },
      err=>{console.log("err in reading today's customers",err)}
    )
  }

  getDetailsByDate(value){
    console.log(value)
    let date = value.yyyy+"-"+value.mm+"-"+value.dd;
    console.log(date)
    this.ps.getCustomersByDate(date).subscribe(
      res=>{
        this.customers=res["message"]
        this.changeDate()
      },
      err=>{console.log("err in reading today's customers",err)}
    )
  }



  customerPurchaseDetails(index){
    
    let id = this.customers[index].Customer_ID
    
    //console.log(id)
    this.router.navigateByUrl("/admin/customer/"+id)
  }

}
