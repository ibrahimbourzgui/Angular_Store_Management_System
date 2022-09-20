import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>;

  constructor() {
    this.products= 
    [
      {
        "id":UUID.UUID(),
        "name":"ordinateur",
        "price": 5500,
        "promotion": true,
      },
      {
        "id":UUID.UUID(),
        "name":"smartphone",
        "price": 3000,
        "promotion": true,
      },
      {
        "id":UUID.UUID(),
        "name":"écouteurs",
        "price": 120,
        "promotion": false,
      }
      
    ];
    for (let i = 0; i <10; i++) {
      this.products.push({
        "id":UUID.UUID(),
        "name":"écouteurs",
        "price": 120,
        "promotion": false,
      });
      this.products.push({
        "id":UUID.UUID(),
        "name":"smartphone",
        "price": 3000,
        "promotion": true,
      });
      this.products.push({
        "id":UUID.UUID(),
        "name":"ordinateur",
        "price": 5500,
        "promotion": true,
      });
    }
  }

  public getAllProducts() : Observable<Array<Product>>
  {
    let rnd= Math.random();
    if(rnd<0) return throwError(( new Error("Internet connexion error")))
  else return of(this.products);
  }

  public getPageProducts(page:number, size:number) : Observable<PageProduct>
  {
    let index = page*size;
   let totalPages= ~~(this.products.length / size);
   if(this.products.length % size!=0)
   totalPages++;
   let pageProducts=this.products.slice(index, index+size);
  return of({page:page, size:size, totalPages:totalPages, products:pageProducts});
  }

  public deleteProduct(id : string) : Observable<boolean>
  {
    this.products = this.products.filter(p=>p.id!=id);
    return of(true);
  }
  public setPromotion(id: string) : Observable<boolean>
  {
   let product= this.products.find(p=>p.id==id);
   if(product!=undefined)
   {
    product.promotion!=product.promotion;
    return of(true);
   }
   else return throwError(()=> new Error("Product not found"))
  }  
  public searchProducts(keyword: string, page: number, size:number) : Observable<PageProduct>
  {
    let result= this.products.filter(p=>p.name.includes(keyword));
    let index = page*size;
    let totalPages= ~~(result.length / size);
    if(this.products.length % size!=0)
    totalPages++;
    let pageProducts=result.slice(index, index+size);
    return of({page:page, size:size, totalPages:totalPages, products:pageProducts});
  }
  public addNewProduct(product: Product) : Observable<Product>
  {
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
  }
  public getProductById(id:string) : Observable<Product>
  {
    let product=this.products.find(p=> p.id==id);
    if(product==undefined) 
    return throwError(()=> new Error ("Product not found"));
    
    return of(product);
  }
 public getErrorMessage(field:string, erros: ValidationErrors)
  {
    if(erros['required']) 
    {
      return field+": ce champ est requis";
    }
    else if (erros['minlength'])
    {
      return field+": vous devez insérez au moins "+erros['minlength']['requiredLength']+" caractères";
    }
    else if (erros['min'])
    {
      return field+": Le prix doit être au moins "+erros['min']['min'];
    }
    else if (erros['pattern'])
    {
      return field+": Vous devez entrer des nombres";
    }
    return "";
  }
  public updateProduct(product : Product) : Observable<Product>
  {
    this.products=this.products.map((p)=>p.id==product.id?product:p);
    return of(product);
  }
}
