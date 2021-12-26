import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerPurchasesComponent } from './customer-purchases/customer-purchases.component';
import { CustomersComponent } from './customers/customers.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProductsComponent } from './products/products.component';
import { SelectComponent } from './select/select.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

const routes: Routes = [ 
  {path : "admin", component : AdminComponent, children : [
    {path : "suppliers", component : SuppliersComponent},
    {path : "products", component : ProductsComponent, children : [
      {path : "filter", component : SelectComponent},
      {path : "add", component : AddproductComponent}
    ]},
    {path : "customers", component : CustomersComponent} ,
    {path : "customer/:id", component : CustomerPurchasesComponent},
    {path : "employee", component : EmployeeComponent, children : [
      {path : "addEmployee", component : AddEmployeeComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
