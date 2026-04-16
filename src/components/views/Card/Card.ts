import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface ICard {
  title: string;
  price: number;
}

export class Card<T> extends Component<ICard | T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(title: string) {
    this.titleElement.textContent = String(title);
  }

	set price(value: number | null) {
		if (value) {
      this.priceElement.textContent =`${value} синапсов`;
		} else {
      this.priceElement.textContent = "Бесценно";
    }
	}
}