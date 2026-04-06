import { IProduct } from "../../types/index.ts";

export class Basket {
_products: IProduct[];

constructor() {
  this._products = [];
}  

getProducts(): IProduct[] {
  return this._products;
}

addProduct(product: IProduct) {
  this._products.push(product);
}

deleteProduct(id: string) {
  this._products = this._products.filter(item => item.id === id);
}

clearProducts() {
  this._products = [];
}

getTotalPrice(): number {
  return this._products.reduce((acc, item) => acc + item.price!, 0);
}

getProductsCount(): number {
  return this._products.length;
}

isProductInBusket(id: string): boolean {
  return this._products.some(product => product.id === id);
}
}