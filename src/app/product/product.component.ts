import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Goods } from 'src/models/goods.class';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {

  numberInBasket = 0;
  @Input() product!: Goods;
  @Input() edit!: boolean;
  @Input() productPosition!: number;
  @Input() numberProduct!: number;
  @Output() numberChange = new EventEmitter<[number, number]>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.numberInBasket = this.numberProduct ? this.numberProduct : 0;
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
