import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})


export class AddproductComponent implements OnInit {

  constructor(private ps : ProductsService,private router : Router) { }

  ngOnInit(): void {
  }

  existingSupplierVar : boolean =false;
  newSupplierVar : boolean = false;
  productDetails : boolean = false ;
  btnsel : boolean =false

  suppliersBrand=[]

  updateDetails={costPrice : {},products :[],supplier : {},new :true,update : false}


  addCostPrice(product){
    this.btnsel=true

    console.log(product) 
    this.updateDetails.costPrice=product
  }

  existingSupplier(){
    this.existingSupplierVar=!this.existingSupplierVar;
    this.newSupplierVar=false
    this.updateDetails.new=false
    this.updateDetails.update=false

    this.ps.newProducts(this.updateDetails).subscribe(
      res=>{this.suppliersBrand=res["message"]},
      err=>{console.log("err in getting suppliersBrand from server",err)}
    )
    console.log(this.suppliersBrand)
  }

  newSupplier(){
    this.newSupplierVar=!this.newSupplierVar
    this.existingSupplierVar=false
    this.updateDetails.new=true;
  }


  addExistingSupplier(value){
    this.productDetails=true

    console.log(value)
    this.updateDetails.supplier=parseInt(value.sname)
  }

  addNewSupplier(value){
    this.productDetails=true

    console.log(value)
    this.updateDetails.supplier=value
  }

  
  addProductDetails(ref1){
    console.log(ref1.value)
    this.updateDetails.products.push(ref1.value)
    ref1.reset()
  }

  update(){
    this.existingSupplierVar =false;
    this.newSupplierVar =false;
    this.productDetails = false ;
    this.btnsel =false
    this.updateDetails.update=true;

    console.log(this.updateDetails)
    this.ps.newProducts(this.updateDetails).subscribe(
      res=>{alert(res["message"])},
      err=>{console.log("err in updating Details to DB ",err)}
    )
    this.router.navigateByUrl("/admin/products")
    this.updateDetails.update=false
    this.updateDetails.products=[]
  }
}
