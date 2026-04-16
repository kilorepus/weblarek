import { ensureElement } from '../../utils/utils';
import { ISuccessActions } from "../../types";
import { Component } from "../base/Component";

interface IOrderSuccess {
  totalPrice: number;
}

export class OrderSuccess extends Component<IOrderSuccess> {
	protected totalPriceElement: HTMLElement;
	protected closeButtonElement: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this.totalPriceElement = ensureElement<HTMLElement>(	"order-success__description", this.container);
		this.closeButtonElement = ensureElement<HTMLButtonElement>( "order-success__close", this.container);

    if (actions?.onClick) {
      this.closeButtonElement.addEventListener('click', actions.onClick);
    }
	}

	set totalPrice(value: number) {
		this.totalPriceElement.textContent = `Списано ${value} синапсов`;
	}
}