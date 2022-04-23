import { Component, OnInit } from '@angular/core';
// ACHTUNG: AngularFirestore ist NICHT AngularFirestoreModule
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Goods, goodsShop } from 'src/models/goods.class';
import { Order } from 'src/models/order.class';

@Component({
  selector: 'app-dialog-add-order',
  templateUrl: './dialog-add-order.component.html',
  styleUrls: ['./dialog-add-order.component.scss']
})
export class DialogAddOrderComponent implements OnInit {
  products: Goods[] = goodsShop;
  numberProductsInBasket: number[] = [];
  order!: Order;
  loading = false;

  // Wichtig vor dem Attribut indem die DI gespeichert wird, muss private 
  // oder public stehen, sonst gibt es einen Fehler:
  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddOrderComponent>
    ) { }

  ngOnInit(): void {
    for(let i = 0; i < goodsShop.length; i++){
      this.numberProductsInBasket.push(0);
    }
  }

  changeNumber(change: [number, number]) {
    this.numberProductsInBasket[change[0]] += change[1];
  }


  saveUser() {
    // this.loading = true;
    // this.user.birthDate = this.birthDate.getTime(); // Erhalte den TimeStamp des Datums
    // console.log('Current User is:', this.user.toJSON());
    // this.firestore
    // .collection('orders')
    // .add(this.user.toJSON())
    // .then((result: any) => {
    //   console.log('Adding user finished', result);
    //   this.loading = false;
    //   this.dialogRef.close();
    // });
    console.log( this.numberProductsInBasket);
    
  }
}
