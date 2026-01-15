import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  branchId = localStorage.getItem('branch_id')!;
  todaySales = 0;
  todayOrders = 0;
  monthSales = 0;
  lowStock: any[] = [];
  topProducts: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit() {
    const today = await this.dashboardService.getTodaySales(this.branchId);
    this.todaySales = today.total_sales;
    this.todayOrders = today.orders_count;

    this.monthSales = await this.dashboardService.getMonthSales(this.branchId);
    this.lowStock = await this.dashboardService.getLowStock(this.branchId);
    this.topProducts = await this.dashboardService.getTopProducts(this.branchId);
  }
}
