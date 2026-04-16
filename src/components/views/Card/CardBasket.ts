import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardActions } from "../../../types";

export interface ICardBasket {
  index: number;
}

export class CardBasket extends Card<ICardBasket> {
  protected indexElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

    if (actions?.onClick) {
      this.buttonElement.addEventListener('click', actions.onClick);
    }
  }

  set index(index: number) {
    this.indexElement.textContent = String(index);
  }
}