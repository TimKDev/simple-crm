import { Goods, goodsShop } from "./goods.class";
import { User } from "./user.class";


export class Order {
  numberProductsInBasket: any = [];
  status! :string;
  customer!: User;
  totalPrice = 0;

  constructor(obj?: any) {
    this.numberProductsInBasket = obj ? obj.numberProductsInBasket : [];
    this.status = obj ? obj.status : 'active';
    this.totalPrice = obj ? obj.totalPrice : 0;
    this.customer = obj ? obj.customer : new User();
  }

  toJSON() {
    return {
      numberProductsInBasket: this.numberProductsInBasket,
      status: this.status,
      customer: this.customer,
      totalPrice: this.totalPrice
    }
  }


}