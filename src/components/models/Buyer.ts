import { TPayment, IBuyer } from "../../types/index.ts";

export class Buyer {
  private _payment: TPayment | null;
  private _email: string;
  private _phone: string;
  private _address: string;

  constructor(){
    this._email = "";
    this._phone = "";
    this._address = "";
    this._payment = null;
  }

  getBayerInfo(): IBuyer {
    return {
      email: this._email,
      phone: this._phone, 
      address: this._address, 
      payment: this._payment
    };
  }
 
  clear() {
    this._payment = null;
    this._email = "";
    this._phone = "";
    this._address = "";
  }
 
  validateAddress(): string {
    if (!this._address) 
        return "адрес не введен";
    else return ""
  }

  validatePayment(): string {
    if (!this._payment) 
        return "способ оплаты не введен";
    else return ""
  }

  validateEmail(): string {
    if (!this._email) 
        return "email не введен";
    else return ""
  }

  validatePhone(): string {
    if (!this._phone)
        return "телефон не введен";
    else return ""
  }

 setAddress(address: string) {
  this._address = address;
 }
 setPayment(payment: TPayment) {
  this._payment = payment;
 }
 setEmail(email: string) {
  this._email = email;
 }
 setPhone(phone: string) {
  this._phone = phone;
 }
 
}


