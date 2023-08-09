import { Person } from "./person.js";

export class Employee extends Person {
    constructor(id, name, address, email, type, datework, salary) {
        super(id, name, address, email, type);

        this.datework = datework;
        this.salary = salary;
    
    }

    tinhLuong() {
        return  this.datework * this.salary;
    }
}
