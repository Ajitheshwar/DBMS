import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-customer-purchases',
  templateUrl: './customer-purchases.component.html',
  styleUrls: ['./customer-purchases.component.css']
})
export class CustomerPurchasesComponent implements OnInit {

  constructor(private ar : ActivatedRoute, private ps : ProductsService, private router : Router) { }

  ngOnInit(): void {
    let  id=this.ar.snapshot.params.id
    this.ps.getCustomerByID(id).subscribe(
      res=>{
        this.products=res["message"];
        this.Customer_ID=id;
        this.Amount=res["message"][0]["Amount"];
        this.CName=res["message"][0]["CName"];
        this.CDate= new Date(res["message"][0]["CDate"]).toDateString()
      },
      err=>{console.log("error in getting customer purchase details from DB",err)}
    )
  }

  products=[]
  Customer_ID
  Amount
  CName
  CDate


  backToCustomers(){
    this.router.navigateByUrl("/admin/customers")
  }
}
