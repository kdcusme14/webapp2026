import { Injectable } from '@angular/core';
import { supabase } from '../../core/supabase.client';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  async getTodaySales(branchId: string) {
    const today = new Date().toISOString().substring(0, 10);

    const { data } = await supabase
      .from('daily_sales')
      .select('total_sales, orders_count')
      .eq('branch_id', branchId)
      .eq('day', today)
      .single();

    return data ?? { total_sales: 0, orders_count: 0 };
  }

  async getMonthSales(branchId: string) {
    const start = new Date();
    start.setDate(1);

    const { data } = await supabase
      .from('orders')
      .select('total')
      .eq('branch_id', branchId)
      .gte('created_at', start.toISOString());

    return data?.reduce((s, o) => s + o.total, 0) ?? 0;
  }

  async getLowStock(branchId: string) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('branch_id', branchId)
      .lte('stock', 5);

    return data ?? [];
  }

  async getTopProducts(branchId: string) {
    const { data } = await supabase
      .from('top_products')
      .select('*')
      .eq('branch_id', branchId)
      .order('total_sold', { ascending: false })
      .limit(5);

    return data ?? [];
  }
}
