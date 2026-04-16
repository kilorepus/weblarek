import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils.ts';
import { Catalog } from "./components/models/Catalog";
import { Basket } from "./components/models/Basket.ts";
import { Api } from "./components/base/Api";
import { Communication } from "./components/communication/Communication";
import { IProductsInfo} from "./types/index.ts";
import { EventEmitter } from './components/base/Events.ts';
import { Gallery } from './components/views/Gallery.ts';
import { Modal } from './components/views/Modal.ts';
import { Header } from './components/views/Header.ts';
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

eventEmitter.on('catalog:changed', () => {
  const itemCards = productsModel.getProducts().map((item) => {
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

  var buttonName = "Купить";
  var eventName = 'card:addBasket';
  var buttonDisabled = false;

  if (basketModel.isProductInBusket(item.id)) {
    buttonName = "Удалить из корзины";
    eventName = 'card:deleteFromBasket';
  }

  if (!item.price) {
    buttonDisabled = true;
    buttonName = "Недоступно";
  }

  var action = {
    onClick: () => eventEmitter.emit(eventName, item)
  }

  const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), action)

  modal.content = cardPreview.render({
    ...item,
    buttonText: buttonName,
    buttonDisabled
  });
  modal.render();
  modal.open();
});

eventEmitter.on('card:addBasket', (item: IProduct) => { 
  modal.close();
  basketModel.addProduct(item);
});

eventEmitter.on('card:deleteFromBasket', (item: IProduct) => { 
  basketModel.deleteProduct(item.id);
});

eventEmitter.on('basket:changed', () => { 
 header.render({counter: basketModel.getProductsCount()}); 
});

eventEmitter.on('basket:open', () => {
  const basketItems = basketModel.getProducts().map((item, index) => {
    const basketItem = new CardBasket(cloneTemplate(cardBasketTemplate), { onClick: () => eventEmitter.emit('card:deleteFromBasket', item) });
    return basketItem.render({...item, index: index});
  })

  const basket = new BasketView(eventEmitter, cloneTemplate(basketTemplate));
  modal.content = basket.render({items: basketItems, total: basketModel.getTotalPrice() });
  modal.render();
  modal.open();
});


try {
  const result: IProductsInfo = await communication.getProducts(); 
  console.log("Массив товаров с сервера: ", result)
  productsModel.saveProducts(result.items);  

} catch (error) {
  console.error('Произошла ошибка', error);
}

