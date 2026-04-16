import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events";

export class Catalog {
  private _products: IProduct[];
  private _currentProduct: IProduct | null

  constructor(protected events: IEvents) {
    this._products = [];
    this._currentProduct = null;
  }

  getProducts(): IProduct[] {
    return this._products;
  }

  setSelectedProduct(product: IProduct) {
    this._currentProduct = product;
    this.events.emit('selectedProduct:changed', product)
  }

  getSelectedProduct(): IProduct | null {
    return this._currentProduct;
  }

  saveProducts(products: IProduct[]) {
    this._products = products;
    this.events.emit('catalog:changed');
  }

  getProduct(id: string): IProduct | undefined {
    return this._products.find((element) => element.id === id);
  }
}