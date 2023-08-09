import { Person } from "./person.js";

export class Student extends Person {
    constructor(id, name, address, email, type, math, physicial, chemistry) {
        super(id, name, address, email, type);

        this.math = math;
        this.physicial = physicial;
        this.chemistry = chemistry;
       
    }

    tinhDTB() {
        return (this.math + this.physicial + this.chemistry) / 3; // %3 lấy phần dư 
    }

}

