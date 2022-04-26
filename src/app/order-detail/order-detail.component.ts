import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Goods, goodsShop } from 'src/models/goods.class';
import { Order } from 'src/models/order.class';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  products: Goods[] = goodsShop; 

  activOrder: Order = new Order();

  numBasket = [0,0,0,0];

  orderId: any = '';

  billStatus: string = 'open'

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public auth: FirebaseAuthService
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
      console.log( this.activOrder);
      this.numBasket = this.activOrder.numberProductsInBasket;
    });
  }

  saveOrder() {
    this.firestore
    .collection('orders')
    .doc(this.orderId)
    .update(this.activOrder.toJSON())
  }

  editOrder() {

  }

  editIBAN() {

  }

  canclePayment() {
    this.activOrder.status = 'active';
    this.saveOrder();
  }

  userPayed() {
    this.activOrder.status = 'payed';
    this.saveOrder();
    
  }

  getBillStatus(order: Order): string {
    if(order.status == 'active') return 'open';
    if(order.status == 'cancled') return 'cancled';
    if(order.status == 'payed' || order.status == 'completed') return 'payed';
    else {
      return 'ORDER STATUS NOT DEFINED';
    }
  }

  sendOrder() {
    if (this.activOrder.status == 'payed'){
      this.activOrder.status = 'completed';
      this.saveOrder();
      alert(`The order was send to ${this.activOrder.customer.firstName} ${this.activOrder.customer.lastName}.`)
    }
    else if(this.activOrder.status == 'completed'){
      alert('The order was already sent.');
    }
    else {
      alert('You do not have permissons to send the order. Please log in as a seller or admin.');
    }
  }


}
