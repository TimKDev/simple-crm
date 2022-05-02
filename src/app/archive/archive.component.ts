import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from 'src/models/order.class';
import { User } from 'src/models/user.class';
import { DialogAddOrderComponent } from '../dialog-add-order/dialog-add-order.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  allOrders: any = [];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.firestore
    .collection('orders')
    .valueChanges({idField: 'orderIdName'}) 
    .subscribe((changes: any) => {
      console.log('Received changes from DB:', changes);
      this.allOrders = changes.filter((order: Order) => {
        return (order.status == 'completed' || order.status == 'cancled');
      });
    });
  }

  deleteOrder(orderId: string) {
    this.firestore
    .collection('orders')
    .doc(orderId)
    .delete();
    // Hierfür gibt es doch eine schönere Lösung oder??? ########################################################
    setTimeout(() => {
      this.router.navigateByUrl('/archive');
    }, 0);
    
  }

}
