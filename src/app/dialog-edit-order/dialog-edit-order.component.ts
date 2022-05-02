import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Goods, goodsShop } from 'src/models/goods.class';
import { Order } from 'src/models/order.class';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-order',
  templateUrl: './dialog-edit-order.component.html',
  styleUrls: ['./dialog-edit-order.component.scss']
})
export class DialogEditOrderComponent implements OnInit {

  activOrder!: Order;
  orderId!: string;
  selectedUser!: User;

  products: Goods[] = goodsShop; 

  numberProductsInBasket: number[] = [];

  totalPrice: number = 0;

  loading = false;

  // Wichtig vor dem Attribut indem die DI gespeichert wird, muss private 
  // oder public stehen, sonst gibt es einen Fehler:
  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditOrderComponent>
    ) { }

  ngOnInit(): void {
    for(let i = 0; i < goodsShop.length; i++){
      this.numberProductsInBasket.push(this.activOrder.numberProductsInBasket[i]);
    }

    this.totalPrice = this.calculateTotalPrice();
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

  generateNumberProductsInBasket() {

  }


  saveOrderChange() {
    this.loading = true;
    let newOrder = {
      numberProductsInBasket: this.numberProductsInBasket,
      status: 'active',
      customer: this.activOrder.customer,
      totalPrice: this.totalPrice
    };

    console.log(newOrder);
    

    this.loading = true;
    this.firestore
    .collection('orders')
    .doc(this.orderId)
    .update(newOrder) 
    .then(() => {
      this.dialogRef.close();
      this.loading = false;      
    });
    
  }

}
