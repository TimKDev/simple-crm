export interface goods{
  name: string,
  price: number,
  imageURL: string
}

export let goodsShop: goods[] = [
  {
    name: 'phone1',
    price: 500,
    imageURL: './assets/img/phone1.jpg'
  },
  {
    name: 'phone2',
    price: 450,
    imageURL: './assets/img/phone2.jpg'
  },
  {
    name: 'phone3',
    price: 700,
    imageURL: './assets/img/phone3.jpg'
  },
  {
    name: 'phone4',
    price: 800,
    imageURL: '../assets/img/phone4.jpg'
  },
];