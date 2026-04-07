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

  getBayerInfo(): Buyer {
    return { ...this };
  }
 
  clear() {
    this._payment = null;
    this._email = "";
    this._phone = "";
    this._address = "";
  }
 
  validateAddress(): string {
    if (this._address.length === 0) 
        return "адрес не введен";
    else return ""
  }

  validatePayment(): string {
    if (this._payment === undefined) 
        return "способа оплаты не введен";
    else return ""
  }

  validateEmail(): string {
    if (this._email.length === 0) 
        return "email не введен";
    else return ""
  }

  validatePhone(): string {
    if (this._phone.length === 0) 
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


