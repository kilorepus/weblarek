export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
  }

export enum TPayment {  
    Card = 'card',
    Cash = 'cash',
}

export interface IBuyer {
    payment?: TPayment;
    email?: string;
    phone?: string;
    address?: string;
  }

export interface IBuyRequest {
    bayer: IBuyer;
    total: number;
    items: string[];
}

export interface IBuyResponse {
    id: string;
    total: number;
}

export interface IProductsInfo {
    total: number;
    items: IProduct[];
}

