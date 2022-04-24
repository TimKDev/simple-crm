import { Component, OnInit } from '@angular/core';
// ACHTUNG: AngularFirestore ist NICHT AngularFirestoreModule
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Goods, goodsShop } from 'src/models/goods.class';
import { Order } from 'src/models/order.class';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-order',
  templateUrl: './dialog-add-order.component.html',
  styleUrls: ['./dialog-add-order.component.scss']
})
export class DialogAddOrderComponent implements OnInit {
  products: Goods[] = goodsShop; 

  numberProductsInBasket: number[] = [];

  allUsers: User[] = [];

  selectedUser: User = this.allUsers[0];

  totalPrice: number = 0;

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

    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes: any) => {
      this.allUsers = changes; 
    });
  }

  changeNumber(change: [number, number]) {
    this.numberProductsInBasket[change[0]] += change[1];
    this.totalPrice = this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.numberProductsInBasket.length; i++) {
      totalPrice += this.numberProductsInBasket[i]*this.products[i].price;
    }
    return totalPrice;
  }

  // generateNumberGoodsArray() {
  //   let numberGoodsArray = [];
  //   for (let i = 0; i < this.numberProductsInBasket.length; i++) {
  //     numberGoodsArray.push([this.products[i], this.numberProductsInBasket[i]]);
  //   }
  //   return numberGoodsArray;
  // }


  saveUser() {
    this.loading = true;
    let newOrder = new Order(this.numberProductsInBasket, this.selectedUser, this.totalPrice);

    this.firestore
    .collection('orders')
    .add(newOrder.toJSON())
    .then((result: any) => {
      console.log('Adding order finished', result);
      this.loading = false;
      this.dialogRef.close();
    });
    console.log( newOrder);
    
  }
}
