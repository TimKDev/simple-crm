import { Goods, goodsShop } from "./goods.class";
import { User } from "./user.class";


export class Order {
  numberGoodsArray: any = [];
  status = 'aktiv';
  customer!: User;
  totalPrice = 0;

  constructor(numberGoodsArray: number[], customer: User, totalPrice: number) {
    this.numberGoodsArray = numberGoodsArray;
    this.totalPrice = totalPrice;
    this.customer = customer;
  }

  toJSON() {
    // let c = this.customer.toJSON();
    console.log(this.customer);
    
    return {
      numberGoodsArray: this.numberGoodsArray,
      status: this.status,
      customer: this.customer,
      totalPrice: this.totalPrice
    }
  }


}