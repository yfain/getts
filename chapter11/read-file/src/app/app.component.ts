import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Component, OnInit} from "@angular/core";
import {Product} from "./product";

@Component({
  selector: 'app-root',
  template: `<h1>Products</h1>
  <ul>
    <li *ngFor="let product of products$ | async">
      {{product.title }}: {{product.price | currency}}
    </li>
  </ul>
  `})
export class AppComponent implements OnInit{
  products$: Observable<Product[]>;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.products$ = this.httpClient.get<Product[]>('/data/products.json');
  }
}