import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService : ProductsService,private router : Router) { }

  products = []
  lessProductList
  size
  suppliers

  ngOnInit(){
    this.allProducts()
  }
  
  allProducts(){
    this.productService.getProducts()
    this.productService.products.subscribe(
      values=>{
        this.products=values
        this.lessProductList = this.products.filter(p => p.Quantity < 10)
        this.size = this.lessProductList.length
      })
  }

  addProduct(){
    this.router.navigateByUrl("/admin/add")
  }

  suppliersList(product)
  {
    console.log(product)
    this.pid=product.Product_ID
    this.productService.getSuppliers(product.Brand_Name).subscribe(
      res=>{this.suppliers=res["message"]},
      err=>{console.log("error in getting suppliers list")}
    )
  }

  pid
  orderProducts(ref)
  {
    let obj=ref.value;
    obj.pid=this.pid;
    this.productService.orderProducts(obj).subscribe(
      res=>{
        alert(res["message"])
        this.lessProductList = this.lessProductList.filter(x => x.pid!=this.pid)
      },
      err=>{alert("Can't order Products")}
    )
  }
}
