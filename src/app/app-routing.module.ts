import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { CustomersComponent } from './customers/customers.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = 
[
  {path : "login", component:LoginComponent},
  {path : "", component:LoginComponent},
  {path : "admin", component:AdminTemplateComponent, canActivate:[AuthenticationGuard],
  children:[
  {path : "products", component:ProductsComponent},
  {path : "customers", component:CustomersComponent},
  {path : "newProduct", component:NewProductComponent},
  {path : "editProduct/:id", component:EditProductComponent},

  
  ]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
