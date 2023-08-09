import { Person } from "./person.js";

export class Student extends Person {
    constructor(id, name, address, email, type, math, physicial, chemistry,DTB) {
        super(id, name, address, email, type);

        this.math = math;
        this.physicial = physicial;
        this.chemistry = chemistry;
        this.DTB=DTB;
    }

    tinhDTB() {
        this.DTB = this.math + this.physicial + this.chemistry;
    }

}

