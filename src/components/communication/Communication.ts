import { IApi, IProductsInfo, IBuyRequest, IBuyResponse } from "../../types/index.ts";

export class Communication {
  _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

  async getProducts(): Promise<IProductsInfo> {
    const userData: IProductsInfo = await this._api.get("/product/");
    return userData;
  }

  async post(request: IBuyRequest): Promise<IBuyResponse> {
    const buyResponse: IBuyResponse = await this._api.post("/order/", request);
    return buyResponse;
  }
}  