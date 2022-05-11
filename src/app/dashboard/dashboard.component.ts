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

  lableChart = ['Phone1', 'Phone2', 'Phone3' ];
  dataChart = [300, 500, 100];

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
    });
  }

  resetStatistics() {
    this.totalPayments = 0;
    this.totalNumber = 0;
    this.totalOpenPayments = 0;
    
  }

  calcStatistics() {
    this.allOrders
    .forEach((order: Order) => {
      
    });
  }

 

}
