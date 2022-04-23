import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Goods } from 'src/models/goods.class';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  numberInBasket = 0;
  @Input() product!: Goods;
  @Input() edit!: boolean;
  @Input() productPosition!: number;
  @Output() numberChange = new EventEmitter<[number, number]>();

  constructor() { }

  ngOnInit(): void {
  }

  removeNumber() {
    if(this.numberInBasket <= 0) return;
    this.numberInBasket--;
    this.numberChange.emit([this.productPosition, -1]);
  }

  addNumber() {
    this.numberInBasket++;
    this.numberChange.emit([this.productPosition, 1]);
  }

}
