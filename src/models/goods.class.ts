export interface Goods{
  name: string,
  price: number,
  imageURL: string
}

export let goodsShop: Goods[] = [
  {
    name: 'Samsung Galaxy X',
    price: 500,
    imageURL: './assets/img/phone1.jpg'
  },
  {
    name: 'Apple iPhone IE',
    price: 950,
    imageURL: './assets/img/phone2.jpg'
  },
  {
    name: 'Samsung Galaxy Note',
    price: 700,
    imageURL: './assets/img/phone3.jpg'
  },
  {
    name: 'LG Neon XL',
    price: 550,
    imageURL: '../assets/img/phone4.jpg'
  },
];