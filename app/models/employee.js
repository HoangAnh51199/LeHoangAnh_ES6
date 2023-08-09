import { Person } from "./person.js";

export class Employee extends Person {
    constructor(id, name, address, email, type, datework, salary,Luong) {
        super(id, name, address, email, type);

        this.datework = datework;
        this.salary = salary;
      this.Luong=Luong;
    }

    tinhLuong() {
        this.Luong = this.datework * this.salary;
    }
}
