import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProduct(): Product {
    return { id: 0, 
            title: "iPhone XI",
            price: 1049.99,
            description: "The latest iPhone" };
  }
}
