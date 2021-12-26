import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { SelectComponent } from './select/select.component';
import { CustomerPurchasesComponent } from './customer-purchases/customer-purchases.component';
import { SearchPipe } from './search.pipe';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmpsearchPipe } from './empsearch.pipe'

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CustomersComponent,
    ProductsComponent,
    SuppliersComponent,
    AddproductComponent,
    SelectComponent,
    CustomerPurchasesComponent,
    SearchPipe,
    EmployeeComponent,
    AddEmployeeComponent,
    EmpsearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
