import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardActions } from "../../../types";

type CategoryKey = keyof typeof categoryMap;

export interface ICardPreview {
  image: string;
  category: string;
  description: string;
  buttonText: string;
  buttonDisabled: boolean;
}

export class CardPreview extends Card<ICardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected textElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.textElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);

    if (actions?.onClick) {
      this.buttonElement.addEventListener('click', actions.onClick);
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }

  set description(description: string) {
    this.textElement.textContent = String(description);
  }

  set buttonText(buttonText: string) {
    this.buttonElement.textContent = String(buttonText);
  }

  set buttonDisabled(buttonDisabled: boolean) {
    this.buttonElement.disabled = buttonDisabled;
  }
}