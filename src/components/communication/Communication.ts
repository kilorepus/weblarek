import { IApi, IProductsInfo, IBuyRequest, IBuyResponse } from "../../types/index.ts";

export class Communication {
  private _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

  async getProducts(): Promise<IProductsInfo> {
    const userData = await this._api.get<IProductsInfo>("/product/");
    return userData;
  }

  async post(request: IBuyRequest): Promise<IBuyResponse> {
    const buyResponse = await this._api.post<IBuyResponse>("/order/", request);
    return buyResponse;
  }
}  