import { Component, ViewChild, OnInit} from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from 'src/models/order.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  totalPayments = 0;
  totalNumber = 0;
  totalOpenPayments = 0;

  lableChart = ['Samsung Galaxy X', 'Apple iPhone IE', 'Samsung Galaxy Note', 'LG Neon XL'];
  dataChart = [0,0,0,0];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, // Diese Option muss hinzugefügt werden, damit sich das Diagramm an die Größe des 
    // Canvas anpasst und nicht umgekehrt! 
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.lableChart,
    datasets: [ {
      data: this.dataChart
    } ]
  };
  pieChartType: ChartType = 'pie';
  pieChartPlugins = [ DatalabelsPlugin ];


  allOrders: any = [];

  constructor(
    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.firestore
    .collection('orders')
    .valueChanges({idField: 'orderIdName'}) 
    .subscribe((changes: any) => {
      this.allOrders = changes.filter((order: Order) => {
        return !(order.status == 'cancled');
      });
      console.log(this.allOrders);
      this.calcStatistics();
    });
  }

  resetStatistics() {
    this.totalPayments = 0;
    this.totalNumber = 0;
    this.totalOpenPayments = 0;
    this.dataChart = [0, 0, 0, 0];
  }

  calcStatistics() {
    this.resetStatistics();
    this.allOrders
    .forEach((order: Order) => {
      this.totalNumber++;
      if(order.status != 'active') this.totalPayments += order.totalPrice;
      else this.totalOpenPayments += order.totalPrice;
      this.addChartNumbers(order);
    });
  }

  addChartNumbers(order: Order) {
    for (let i = 0; i < order.numberProductsInBasket.length; i++) {
      this.dataChart[i] += order.numberProductsInBasket[i];
    }
    this.pieChartData = {
      labels: this.lableChart,
      datasets: [ {
        data: this.dataChart
      } ]
    };
  }

  checkZeroChartData(dataChart: number[]): boolean {
    let result = false;
    dataChart.forEach((num: number) => {
      if(num != 0) result = true;
    });
    return result;
  }

 

}
