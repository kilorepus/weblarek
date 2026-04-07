import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';
import { Catalog } from "./components/models/Catalog";
import { Basket } from "./components/models/Basket";
import { Buyer } from "./components/models/Buyer";
import { Api } from "./components/base/Api";
import { Communication } from "./components/communication/Communication";
import { IApi, IProductsInfo, IBuyRequest, IBuyResponse, TPayment } from "./types/index.ts";

// 1 class Catalog
const productsModel = new Catalog();
productsModel.saveProducts(apiProducts.items);
console.log("Массив товаров из каталога: ", productsModel.getProducts())

productsModel.setSelectedProduct(apiProducts.items[0])
console.log("получение товара для подробного отображения: ", productsModel.getSelectedProduct())

console.log("получение одного товара по его id: ", productsModel.getProduct(apiProducts.items[0].id))

// 2 class Basket
const basketModel = new Basket();
basketModel.addProduct(apiProducts.items[0]);
console.log("получение массива товаров, которые находятся в корзине: ", basketModel.getProducts())

basketModel.addProduct(apiProducts.items[1]);
console.log("получение стоимости всех товаров в корзине: ", basketModel.getTotalPrice())

console.log("получение количества товаров в корзине: ", basketModel.getProductsCount())

console.log("проверка наличия товара в корзине по его id: ", basketModel.isProductInBusket(apiProducts.items[0].id))

basketModel.deleteProduct(apiProducts.items[0].id);
console.log("удаление товара, полученного в параметре из массива корзины: ", basketModel.getProducts())

basketModel.clearProducts()
console.log("очистка корзины: ", basketModel.getProducts())

// 3 class Buyer 

const buyerModel = new Buyer();

console.log("валидация данных адреса: ", buyerModel.validateAddress())
buyerModel.setAddress("МСК, набережная Чижика")
console.log("сохранение адреса покупателя: ", buyerModel.getBayerInfo())
console.log("валидация способа оплаты: ", buyerModel.validatePayment())
buyerModel.setPayment(TPayment.Card)
console.log("сохранение способа оплаты покупателя: ", buyerModel.getBayerInfo())
console.log("валидация данных адреса: ", buyerModel.validateAddress())
console.log("валидация способа оплаты: ", buyerModel.validatePayment())
console.log("валидация данных email: ", buyerModel.validateEmail())
console.log("валидация данных телефона: ", buyerModel.validatePhone())
buyerModel.setEmail("123@email.com")
console.log("сохранение email покупателя: ", buyerModel.getBayerInfo())
buyerModel.setPhone("+7777434343")
console.log("сохранение телефона покупателя: ", buyerModel.getBayerInfo())
buyerModel.clear()
console.log("очистка данных покупателя: ", buyerModel.getBayerInfo())
 


// 4 работа с сервером

const communication = new Communication(new Api(API_URL))

  try {
    const result: IProductsInfo = await communication.getProducts(); 
    console.log("Массив товаров с сервера: ", result)
    productsModel.saveProducts(result.items);
    console.log("Массив товаров из каталога, полученного с сервера: ", productsModel.getProducts())

  } catch (error) {
    console.error('Произошла ошибка', error);
  }



