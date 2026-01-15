import { Injectable } from '@angular/core';
import { supabase } from '../../core/supabase.client.';

@Injectable({ providedIn: 'root' })
export class OrderService {

  async createOrder(
    branchId: string,
    items: any[],
    userId: string
  ) {
    const total = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        branch_id: branchId,
        user_id: userId,
        total,
      })
      .select()
      .single();

    if (error) throw error;

    const orderItems = items.map(i => ({
      order_id: order.id,
      product_id: i.product_id,
      quantity: i.quantity,
      price: i.price,
    }));

    await supabase.from('order_items').insert(orderItems);

    // Descontar stock
    for (const i of items) {
      await supabase.rpc('decrease_stock', {
        product_id: i.product_id,
        qty: i.quantity,
      });
    }

    return order;
  }
}
