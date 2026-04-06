import { TPayment, IBuyer } from "../../types/index.ts";

export class Buyer {
  _payment?: TPayment;
  _email?: string;
  _phone?: string;
  _address?: string;


  constructor(){
  }

  getBayerInfo(): IBuyer {
    return { 
      payment: this._payment,
      email: this._email,
      phone: this._phone,
      address: this._address
    }
  }
 
  clear() {
    this._payment = undefined;
    this._email = undefined;
    this._phone = undefined;
    this._address = undefined;
  }
 
  validateAddress(): string {
    if (this._address === undefined) 
        return "адрес не введен";
    else return ""
  }

  validatePayment(): string {
    if (this._payment === undefined) 
        return "способа оплаты не введен";
    else return ""
  }

  validateEmail(): string {
    if (this._email === undefined) 
        return "email не введен";
    else return ""
  }

  validatePhone(): string {
    if (this._phone === undefined) 
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


