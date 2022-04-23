import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddOrderComponent } from '../dialog-add-order/dialog-add-order.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  allOrders: any = [];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.firestore
    .collection('orders')
    .valueChanges({idField: 'orderIdName'}) 
    .subscribe((changes: any) => {
      console.log('Received changes from DB:', changes);
      this.allOrders = changes;
      
    });
  }

  openDialog() {
    // An die Material Service Methode open() wird die Komponente übergeben, die im
    // Dialogfenster angezeigt werden soll:
    const dialogRef = this.dialog.open(DialogAddOrderComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
