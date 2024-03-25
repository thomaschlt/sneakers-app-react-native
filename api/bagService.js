import Service from "./service";

// Access to API
const root = "https://ensc2023chimbaultrenaud.azurewebsites.net/api/";

// Model class for a bag
export class Bag {
  constructor(id, price, shoes, type, customerId) {
    this.id = id;
    this.price = price;
    this.shoes = shoes;
    this.type = type;
    this.customerId = customerId;
  }
}

class BagService {
  // GET: BagApi/2
  // Get the specific bag of a customer
  async GetBag(customerId) {
    const query = `BagApi/${customerId}`;
    const data = await Service.fetchFromApi(root + query);
    return this.createBag(data);
  }

  // PUT: BagApi/1
  // Modify a bag of a customer in the DB
  async PutBag(customerId, data) {
    const query = `BagApi/${customerId}`;
    await Service.putFromApi(root + query, data);
  }
  /* TEST on Postman
    To add a shoe
    PUT : {root}/BagApi/1
    {
        "Id":1,
        "CustomerId": 1,
        "ShoeId": 1,
        "Type":0
    }
    To remove a shoe
    PUT :{root}/BagApi/1
    {
        "Id":1,
        "CustomerId": 1,
        "ShoeId": 1,
        "Type":1
    }
    */

  // Creation of an object bag
  createBag(bag) {
    return new Bag(bag.id, bag.price, bag.shoes, bag.type, bag.customerId);
  }
}
export default new BagService();
