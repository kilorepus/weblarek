import { IProduct } from "../../types/index.ts";

export class Catalog {
  private _products: IProduct[];
  private _currentProduct: IProduct | null

  constructor() {
    this._products = [];
    this._currentProduct = null;
  }

  getProducts(): IProduct[] {
    return this._products;
  }

  setSelectedProduct(product: IProduct) {
    this._currentProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this._currentProduct;
  }

  saveProducts(products: IProduct[]) {
    this._products = products;
  }

  getProduct(id: string): IProduct | undefined {
    return this._products.find((element) => element.id === id);
  }
}