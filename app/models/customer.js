import { Person } from "./person.js";

export class Customer extends Person {
  constructor(id, name, address, email, type,company,bill,review) {
    super(id, name, address, email, type);

    this.company= company;
    this.bill=bill;
    this.review=review;
  }

 
}
