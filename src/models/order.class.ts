import { goods, goodsShop } from "./goods.class";
import { User } from "./user.class";


export class Order {
  numberGoodsArray: [goods, number][] = [];
  status = 'versendet';
  customer!: User;
  totalPrice = 0;

  constructor(numberGoods: [number, number, number, number], customer: User) {
    for (let i = 0; i < 4; i++) {
      this.numberGoodsArray.push([goodsShop[i], numberGoods[i]]);
      this.totalPrice += goodsShop[i].price*numberGoods[i];
    }
    this.customer = customer;
  }
}