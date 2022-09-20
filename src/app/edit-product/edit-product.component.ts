import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId!: string;
  errorMessage!:string;
  product!:Product;
  productFormGroup!: FormGroup;

  constructor( private route: ActivatedRoute, public productService: ProductService, private fb: FormBuilder, private router: Router) 
  {
    this.productId=this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (data)=>
      {
        this.product=data;
        this.productFormGroup=this.fb.group({
          name:this.fb.control(this.product.name,[Validators.required, Validators.minLength(4)]),
          price:this.fb.control(this.product.price,[Validators.required, Validators.min(200), Validators.pattern("^[0-9]*$")]),
          promotion:this.fb.control(this.product.promotion , Validators.required)
    
      })
    },
      error: err=> this.errorMessage=err         
    });
  }

  public handleUpdateProduct()
  {
    let p = this.productFormGroup.value;
    p.id=this.product.id;
    this.productService.updateProduct(p).subscribe({
      next:(data) =>
      {
        alert("Product updated succefully");
        this.router.navigateByUrl("admin/products");
      },
      error:err=> {
        this.errorMessage=err;
      },
    })
  }
}
