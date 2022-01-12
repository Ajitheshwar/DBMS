import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  products= new BehaviorSubject<any>(0)
  productsObservable= this.products.asObservable()

  updateProducts(data){
    this.products.next(data)
  }

  //Products

  getProducts() {
    this.http.get("/admin/products").subscribe(
      res=>{this.updateProducts(res["message"])},
      err=>{console.log("err in getting products list",err)}
    )
  }

  getSuppliers(Brand)
  {
    let obj={brand : Brand}
    return this.http.post("/admin/products",obj);
  }

  orderProducts(orderDetails)
  {
    return this.http.put("/admin/products",orderDetails)
  }


  //Select 
  getBrands(): Observable<any>{
    return this.http.get("/admin/products/filter")
  }

  getFilteredProducts(filter){
    this.http.post("/admin/products/filter",filter).subscribe(
      res=>{this.updateProducts(res["message"])},
      err=>{console.log("err in getting filtered products",err)}
    )
  }





  // Add Products
  newProducts(details) : Observable<any>{
    return this.http.post("admin/products/add",details) 
  }



  // Customer
  updateCustomer(customerPurchases) : Observable<any>{
    let obj={filter : false,purchases :customerPurchases}
    return this.http.post("/admin/customers",obj);
  }

  getCustomersByDate(dateOfPurchase): Observable<any>{
    let obj={filter : true,date : dateOfPurchase}
  return this.http.post("/admin/customers",obj);
  }


  // Customer-purchase
  getCustomerByID(id)  : Observable<any>{
    return this.http.get("/admin/customer/"+id)
  }


  //Suppliers
  getSuppliersDetails() : Observable<any>{
    return this.http.get("/admin/suppliers")
  }


  //employee
  getEmployee() : Observable<any> {
    return this.http.get("/admin/employee")
  }

  deleteEmployee(e)
  {
    console.log(e)
    return this.http.put("/admin/employee",e)
  }

  saveEmployee(e)
  {
    console.log(e);
    return this.http.put("/admin/employee",e);
  }


  //add-employee
  addEmployee(details) : Observable<any>{
    return this.http.post("/admin/employee/addEmployee",details)
  }

}