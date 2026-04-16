import { Component } from '../base/Component';
import { IEvents } from "../base/Events";
import { ensureElement } from '../../utils/utils';

interface IFormState {
  valid: boolean;
  errors: string[];
}

export class Form<T> extends Component<T | IFormState> {
  protected submitButtonElement: HTMLButtonElement;
  protected errorsElement: HTMLElement;
  protected timeoutId = 0;
  protected validationDelay = 500;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.submitButtonElement = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);

    this.container.addEventListener('input', (e: Event) => {
      clearTimeout(this.timeoutId); // Сброс старой проверки
      this.timeoutId = window.setTimeout(() => {
        const target = e.target as HTMLInputElement;
        const field = target.name as keyof T;
        const value = target.value;
        this.onInputChange(field, value);
      }, this.validationDelay);
    });

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.name}:submit`);
    });
  }

  protected onInputChange(field: keyof T, value: string) {
    this.events.emit('orderInput:change', {
      field,
      value,
    })
  }

  set valid(value: boolean) {
    console.log("valid: ", value);
    this.submitButtonElement.disabled = !value;
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
}