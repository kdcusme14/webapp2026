import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  branchId = localStorage.getItem('branch_id')!;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    this.products = await this.productService.getProducts(this.branchId);
  }
}
