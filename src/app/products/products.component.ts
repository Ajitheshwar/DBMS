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

  products
  ngOnInit(){
    this.allProducts()
  }
  
  allProducts(){
    this.productService.getProducts()
    this.productService.products.subscribe(values=>{this.products=values})
  }

  addProduct(){
    this.router.navigateByUrl("/admin/add")
  }

}
