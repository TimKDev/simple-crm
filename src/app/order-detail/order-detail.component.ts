import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/models/order.class';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  activOrder: Order = new Order();

  orderId: any = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.orderId = paramMap.get('idOrder');
      console.log(this.orderId);
      this.getOrder(); 
    });
  }

  getOrder() {
    this.firestore
    .collection('orders')
    .doc(this.orderId)
    .valueChanges()
    .subscribe((order: any) => {
      this.activOrder = new Order(order);
    });
  }

  editOrder() {

  }

  editIBAN() {

  }
}
