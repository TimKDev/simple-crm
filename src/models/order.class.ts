import { Goods, goodsShop } from "./goods.class";
import { User } from "./user.class";


export class Order {
  numberGoodsArray: any = [];
  status! :string;
  customer!: User;
  totalPrice = 0;

  constructor(obj?: any) {
    this.numberGoodsArray = obj ? obj.numberGoodsArray : [];
    this.status = obj ? obj.status : 'active';
    this.totalPrice = obj ? obj.totalPrice : 0;
    this.customer = obj ? obj.customer : new User();
  }

  toJSON() {
    return {
      numberGoodsArray: this.numberGoodsArray,
      status: this.status,
      customer: this.customer,
      totalPrice: this.totalPrice
    }
  }


}