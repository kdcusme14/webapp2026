import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';
import { OrderService } from './order.service';
import { supabase } from '../../core/supabase.client';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html'
})
export class PosComponent implements OnInit {

  products: any[] = [];
  cart: any[] = [];
  branchId = localStorage.getItem('branch_id')!;
  userId!: string;

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    const user = await supabase.auth.getUser();
    this.userId = user.data.user!.id;
    this.products = await this.productService.getProducts(this.branchId);
  }

  addToCart(product: any) {
    const item = this.cart.find(i => i.product_id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cart.push({
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
  }

  get total() {
    return this.cart.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
  }

  async checkout() {
    if (!this.cart.length) return;

    await this.orderService.createOrder(
      this.branchId,
      this.cart,
      this.userId
    );

    this.cart = [];
    alert('Venta registrada con éxito');
  }
}
