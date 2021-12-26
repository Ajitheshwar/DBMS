import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor(private ps : ProductsService,private router : Router) { }
  brands=[]
  ngOnInit(){
    this.ps.getBrands().subscribe(
      res=>{this.brands=res["message"]}
    )
  }

  apply(ref){

    let obj={from : parseInt(ref.value.from),to : parseInt(ref.value.to),type : ref.value.type, brand : ref.value.brand}
    console.log(obj)
    this.ps.getFilteredProducts(obj)
    this.router.navigateByUrl("/admin/products")
  }
}
