import Service from "./service";

// Access to API
const root = "https://ensc2023chimbaultrenaud.azurewebsites.net/api/";

// Model class for a shoe
export class ShoeCollection {
  constructor(id, estimate, shoes, customerId) {
    this.id = id;
    this.estimate = estimate;
    this.shoes = shoes;
    this.customerId = customerId;
  }
}

class ShoeCollectionService {
  // GET: ShoeCollectionApi/1
  // Return the shoe collection of a custumer
  async GetShoeCollection(customerId) {
    const query = `ShoeCollectionApi/${customerId}`;
    const data = await Service.fetchFromApi(root + query);
    return this.createShoeCollection(data);
  }

  // PUT: ShoeCollectionApi/1
  // Add a bag or sell a shoe from the shoe collection of a customer
  async PutShoeCollection(customerId, data) {
    const query = `ShoeCollectionApi/${customerId}`;
    await Service.putFromApi(root + query, data);
  }
  //When you want to buy your bag
  /* TEST sur Postman
  To buy a bag
  PUT : https://localhost:{port}/api/ShoeCollectionApi/1
  {
      "Id":1,
      "CustomerId": 1,
      "Type":O
  }
  To sell a shoe 
  PUT : https://localhost:{port}/api/ShoeCollectionApi/1
  {
      "Id":1,
      "CustomerId": 1,
      "ShoeId": 1,
      "Type":1
  }*/

  createShoeCollection(shoeCollection) {
    return new ShoeCollection(
      shoeCollection.id,
      shoeCollection.estimate,
      shoeCollection.shoes,
      shoeCollection.customerId
    );
  }
}
export default new ShoeCollectionService();
