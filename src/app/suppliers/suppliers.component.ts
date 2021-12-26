import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  constructor(private ps : ProductsService) { }

  suppliers=[]
  searchTerm : String;

  ngOnInit(): void {
    this.ps.getSuppliersDetails().subscribe(
      res=>{this.suppliers=res["message"]},
      err=>{console.log("err in reading suppliers info",err)}
    )
  }

}
