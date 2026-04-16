import { Component } from "../base/Component";
import { ensureElement } from '../../utils/utils';
import { IEvents } from "../base/Events";

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData> {
	protected closeButton: HTMLButtonElement;
	protected contentElement: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
		this.contentElement = ensureElement<HTMLElement>('.modal__content', container);

		this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });
	}

	set content(value: HTMLElement) {
		this.contentElement.replaceChildren(value);
	}

	open() {
	 	this.container.classList.add('modal_active');
	 	this.events.emit('modal:open');
	}

	close() {
	  this.container.classList.remove('modal_active');
		this.events.emit('modal:close');
	}
}