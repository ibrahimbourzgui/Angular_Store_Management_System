import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productFormGroup!: FormGroup;
  constructor( private fb : FormBuilder, public productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:this.fb.control(null,[Validators.required, Validators.minLength(4)]),
      price:this.fb.control(null,[Validators.required, Validators.min(200), Validators.pattern("^[0-9]*$")]),
      promotion:this.fb.control(false , Validators.required),


    })
  }
  handleAddProduct(){
    let product=this.productFormGroup.value;
    this.productService.addNewProduct(product).subscribe({
      next:(data)=>
      {
        this.productFormGroup.reset();
        alert("Product added succesfully");
        this.route.navigateByUrl("/admin/products");
      },
      error: err => this.productService.getErrorMessage=err
    });
  }

  

}
