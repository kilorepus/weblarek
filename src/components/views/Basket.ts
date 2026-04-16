import { ensureElement } from "../../utils/utils";
import { Component } from '../base/Component';
import { IEvents } from "../base/Events";

export interface IBasket {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasket> {
  protected basketListElement: HTMLElement;
  protected basketPriceElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.basketListElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.basketPriceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.buttonElement.addEventListener('click', () => {
          events.emit('order:open')
        });
    };

    set items(items: HTMLElement[]) {
      if (items.length) {
        this.basketListElement.replaceChildren(...items);
      } else {
        this.buttonElement.disabled = true;
      }
    }

    set total(total: number) {
        this.basketPriceElement.textContent =`${total} синапсов`;
    };
};