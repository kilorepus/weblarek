import { TPayment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from './Form';

interface IOrderDeliveryForm {
  payment: TPayment,
  address: string,
}

export class Order extends Form<IOrderDeliveryForm> {
  protected cardElement: HTMLButtonElement;
  protected cashElement: HTMLButtonElement;
  protected addressElement: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events)


    this.cardElement = ensureElement<HTMLButtonElement>('card', this.container);
    this.cashElement = ensureElement<HTMLButtonElement>('cash', this.container);
    this.addressElement = ensureElement<HTMLInputElement>('address', this.container);
    
        this.cardElement.addEventListener('click', () => {
            this.cardElement.classList.add('button_alt-active')
            this.cashElement.classList.remove('button_alt-active')
            this.onInputChange('payment', 'card')
        })

        this.cashElement.addEventListener('click', () => {
            this.cashElement.classList.add('button_alt-active')
            this.cardElement.classList.remove('button_alt-active')
            this.onInputChange('payment', 'cash')
        })
  }
  
  set address(value: string) {
    this.addressElement.value = value
  }
}