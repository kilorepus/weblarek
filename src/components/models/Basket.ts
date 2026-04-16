import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events";

export class Basket {
 private _products: IProduct[];

constructor(protected events: IEvents) {
  this._products = [];
}  

getProducts(): IProduct[] {
  return this._products;
}

addProduct(product: IProduct) {
  this._products.push(product);
  this.events.emit('basket:changed');
}

deleteProduct(id: string) {
  this._products = this._products.filter(item => item.id != id);
  this.events.emit('basket:changed');
}

clearProducts() {
  this._products = [];
  this.events.emit('basket:changed');
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