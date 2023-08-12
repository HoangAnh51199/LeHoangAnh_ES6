export class ListPerson {
  personList = [];
  personType= [];

  add = (person) => {
    this.personList = [...this.personList, person];
  };

  delete = (id) => {
    const index = this.personList.findIndex((element) => {
      return element.id === id;
    });

    this.personList.splice(index, 1);
  };

  findById(id) {
    const existedPerson = this.personList.find((element) => {
      return element.id === id; //giống biến_bind khai báo chứa this 
    });
    //console.log(existedPerson);
    return existedPerson;
  }

  update(person) {
    const index = this.personList.findIndex((element) => {
      return element.id === person.id;
    });
    this.personList[index] = person;

  }

  


  sortByName(type) {
    
    let  personSortName = [];

    // personSortName = [...this.personList];
   const loai= document.getElementById("type").value;
    if(type ==="all") {
      personSortName = [...this.personList];
    }else  {
      personSortName = [...this.personType];
    }
      

    const data = personSortName.sort((a, b) => {

      return a.name.localeCompare(b.name);

    });
    console.log(data);
    return data;
  }


  filterbyType(type) {

    const data = this.personList.filter((element) => {

      if (type === "all") {
        return true;
      }

      return element.type === type;
    });

    //console.log(data);
    this.personType = [...data];

    return this.personType;

  }

}