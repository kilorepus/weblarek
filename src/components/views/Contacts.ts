import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from './Form';

export interface IContacts {
  phone: string;
  email: string;
}

export class Contacts extends Form<IContacts> {
  protected emailElement: HTMLInputElement;
  protected phoneElement: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.emailElement = ensureElement<HTMLInputElement>('email', this.container);
    this.phoneElement = ensureElement<HTMLInputElement>('phone', this.container);
  }
  
  set email(value: string) {
      this.emailElement.value = value
  }

  set phone(value: string) {
      this.phoneElement.value = value
  }

}