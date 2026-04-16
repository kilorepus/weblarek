import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils.ts';
import { Catalog } from "./components/models/Catalog";
import { Basket } from "./components/models/Basket.ts";
import { Buyer } from "./components/models/Buyer.ts";
import { Api } from "./components/base/Api";
import { Communication } from "./components/communication/Communication";
import { IBuyer, IProductsInfo, TPayment, IBuyResponse} from "./types/index.ts";
import { EventEmitter } from './components/base/Events.ts';
import { Gallery } from './components/views/Gallery.ts';
import { Modal } from './components/views/Modal.ts';
import { Header } from './components/views/Header.ts';
import { Order } from './components/views/Order.ts';
import { Contacts } from './components/views/Contacts.ts';
import { OrderSuccess } from './components/views/OrderSuccess.ts';
import { CardBasket } from './components/views/Card/CardBasket';
import { Basket as BasketView} from './components/views/Basket';
import { CardCatalog } from './components/views/Card/CardCatalog.ts';
import { CardPreview } from './components/views/Card/CardPreview.ts';
import { ensureElement } from "./utils/utils";
import { IProduct } from "./types/index.ts";

const communication = new Communication(new Api(API_URL))
const eventEmitter = new EventEmitter();
const productsModel = new Catalog(eventEmitter);
const basketModel = new Basket(eventEmitter);
const buyerModel = new Buyer(eventEmitter);

const header = new Header(eventEmitter, ensureElement<HTMLElement>('header'));
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;

const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;

const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const gallery = new Gallery(document.body);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), eventEmitter);

const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), eventEmitter)
const basket = new BasketView(eventEmitter, cloneTemplate(basketTemplate));

const orderForm = new Order(cloneTemplate(orderTemplate), eventEmitter);
const contactsForm = new Contacts(cloneTemplate(contactsTemplate), eventEmitter);
const successForm = new OrderSuccess(cloneTemplate(successTemplate), eventEmitter);

eventEmitter.on('catalog:changed', () => {
  const itemCards = productsModel.getProducts().map((item) => {
    item.image = CDN_URL + item.image;
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => eventEmitter.emit('card:select', item)
    });
    return card.render(item);
  });
  gallery.render({catalog: itemCards});
});

eventEmitter.on('card:select', (item: IProduct) => { 
  productsModel.setSelectedProduct(item) 
});

eventEmitter.on('selectedProduct:changed', (item: IProduct) => { 

  let buttonName = "Купить";
  let buttonDisabled = false;

  if (basketModel.isProductInBusket(item.id)) {
    buttonName = "Удалить из корзины";
  }

  if (!item.price) {
    buttonDisabled = true;
    buttonName = "Недоступно";
  }

  modal.content = cardPreview.render({
    ...item,
    buttonText: buttonName,
    buttonDisabled
  });
  modal.render();
  modal.open();
});


eventEmitter.on('cardPreview:buttonClick', () => {
  const product = productsModel.getSelectedProduct();

  if (basketModel.isProductInBusket(product!.id)) {
    basketModel.deleteProduct(product!.id);
  } else {
    basketModel.addProduct(product!);
  }
  modal.close();
});

eventEmitter.on('card:deleteFromBasket', (data: {item: IProduct, isNeedToCloseModal: boolean}) => { 
  basketModel.deleteProduct(data.item.id);
});

eventEmitter.on('basket:changed', () => { 
 header.render({counter: basketModel.getProductsCount()});

 const basketItems = basketModel.getProducts().map((item, index) => {
    const basketItem = new CardBasket(cloneTemplate(cardBasketTemplate), { onClick: () => eventEmitter.emit('card:deleteFromBasket', {item: item, isNeedToCloseModal: false}) });
    return basketItem.render({...item, index: ++index});
  })
  basket.render({items: basketItems, total: basketModel.getTotalPrice() });
});

eventEmitter.on('basket:open', () => {
  modal.content = basket.render();
  modal.render();
  modal.open();
});

eventEmitter.on('order:open', () => {
  modal.content = orderForm.render();
  modal.render();
});

eventEmitter.on('order:submit', () => {
  const buyerInfo = buyerModel.getBayerInfo();
  let errors = [];
  if (buyerModel.validateEmail()) {
    console.log("bad email")
    errors.push(buyerModel.validateEmail())
  }

  if (buyerModel.validatePhone()) {
    console.log("bad phone")
    errors.push(buyerModel.validatePhone())
  }

  modal.content = contactsForm.render({
    ...buyerInfo,
    valid: errors.length === 0,
    errors: errors
  });
  modal.render();
});

eventEmitter.on('contacts:submit', () => {
  const buyerInfo = buyerModel.getBayerInfo();

  const request = {
    payment: buyerInfo.payment!,
    email: buyerInfo.email,
    phone: buyerInfo.phone,
    address: buyerInfo.address,
    total: basketModel.getTotalPrice(),
    items: basketModel.getProducts().map(item => {
     return item.id
    })
  };

  communication.post(request)
  .then(result => {
     console.log(result)
     modal.content = successForm.render({
      ...result
    });
    modal.render();
    basketModel.clearProducts();
    buyerModel.clear();
  })
  .catch(err => console.error(err));
});

eventEmitter.on('success:close', () => { 
  modal.close();
});

eventEmitter.on('orderInput:change', (data: {field: keyof IBuyer, value: string }) => {
  console.log("field: ", data.field, "value: ", data.value)
  if (data.field === "address") {
    buyerModel.setAddress(data.value);
  } else if (data.field === "payment") {
    buyerModel.setPayment(data.value as TPayment);
  } else if (data.field === "email") {
    buyerModel.setEmail(data.value);
  } else if (data.field === "phone") {
    buyerModel.setPhone(data.value);
  } 
});

eventEmitter.on('buyer:changed', (data: {field: string}) => {
  const buyerInfo = buyerModel.getBayerInfo();
  let errors: string[] = [];

  if (!data) {
    orderForm.render({
      ...buyerInfo,
      valid: errors.length === 0,
      errors: errors
    });

    contactsForm.render({
      ...buyerInfo,
      valid: errors.length === 0,
      errors: errors
    });

    return
  }

  if (data.field === "address" || data.field === "payment") {
    if (buyerModel.validatePayment()) {
      errors.push(buyerModel.validatePayment())
    }
  
    if (buyerModel.validateAddress()) {
      errors.push(buyerModel.validateAddress())
    }
  
    modal.content = orderForm.render({
      ...buyerInfo,
      valid: errors.length === 0,
      errors: errors
    });
  } else {
    if (buyerModel.validateEmail()) {
      errors.push(buyerModel.validateEmail())
    }
  
    if (buyerModel.validatePhone()) {
      errors.push(buyerModel.validatePhone())
    }
  
    modal.content = contactsForm.render({
      ...buyerInfo,
      valid: errors.length === 0,
      errors: errors
    });
  }

  modal.render();
});

try {
  const result: IProductsInfo = await communication.getProducts(); 
  console.log("Массив товаров с сервера: ", result)
  productsModel.saveProducts(result.items);  

} catch (error) {
  console.error('Произошла ошибка', error);
}

