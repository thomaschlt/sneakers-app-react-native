import Service from "./service";

// Access to API
const root = "https://ensc2023chimbaultrenaud.azurewebsites.net/api/";

// Model class for a shoes
export class Shoe {
  constructor(id, brand, name, type, price, image) {
    this.id = id;
    this.brand = brand;
    this.name = name;
    this.type = type;
    this.price = price;
    this.image = image;
  }
}

class shoeService {
  // GET: ShoeApi
  // Get all the shoes in DB without their properties
  async GetShoes() {
    const query = "shoeApi";
    const shoes = await Service.fetchFromApi(root + query);
    return shoes.map((shoe) => this.createShoe(shoe));
  }

  // GET: ShoeApi/3
  // Get a specific shoe with its inventory
  async GetShoe(shoeId) {
    const query = `shoeApi/${shoeId}`;
    const shoes = await Service.fetchFromApi(root + query);
    return shoes.map((shoe) => this.createShoe(shoe));
  }

  // Get all the brands present in the shoes array
  async GetBrands() {
    const query = "shoeApi";
    const shoes = await Service.fetchFromApi(root + query);
    const brands = new Set();
    for (const shoe of shoes) {
      brands.add(shoe.brand);
    }
    return Array.from(brands);
  }

  // Creation of an object shoe
  createShoe(shoe) {
    return new Shoe(
      shoe.id,
      shoe.brand,
      shoe.name,
      shoe.type,
      shoe.price,
      shoe.image
    );
  }
}
export default new shoeService();
