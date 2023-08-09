export class FoodService {
  //   constructor() {
  //     this.foodList = [];
  //   }
  foodList = [];

  add = (food) => {
    // this.foodList.push(food);
    this.foodList = [...this.foodList, food];
  };

  delete = (id) => {
    const index = this.foodList.findIndex((element) => {
      return element.id === id;
    });

    this.foodList.splice(index, 1);
  };

  findById(id) {
    const existedFood = this.foodList.find((element) => {
      return element.id === id;
    });
    return existedFood;
  }

  update(food) {
    const index = this.foodList.findIndex((element) => {
      return element.id === food.id;
    });
    this.foodList[index] = food;

  }

  filterbyType(type) {
    const data = this.foodList.filter((element) => {

      if (type === "all") {
        return true;
      }

      return element.type === type;
    });
        //console.log(data);
    return data;

  }
}
