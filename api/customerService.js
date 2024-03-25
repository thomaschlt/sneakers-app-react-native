import Service from "./service";

// Access to API
const root = "https://ensc2023chimbaultrenaud.azurewebsites.net/api/";

// Model class for a customer
export class Customer {
  constructor(id, username, firstName, lastName, email, password) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

class CustomerService {
  // GET: CustomerApi
  // Return the list of customers
  async GetCustomers() {
    const query = `CustomerApi/`;
    const data = await Service.fetchFromApi(root + query);
    return this.createCustomers(data);
  }

  // GET: CustomerApi/1
  // Return a customer
  async GetCustomer(customerId) {
    const query = `CustomerApi/${customerId}`;
    const data = await Service.fetchFromApi(root + query);
    return this.createCustomer(data);
  }

  // POST: CustomerApi
  // Add a new customer in the DB
  async PostCustomer(data) {
    const query = `CustomerApi/`;
    const response = await Service.postFromApi(root + query, data);
    return this.createCustomer(response);
  }
  /* TEST on Postman
  POST : {root}/CustomerApi
  {
      "Username" : "test",
      "FirstName" : "test",
      "LastName" : "test",
      "Email" : "test",
      "Password" : "test"
  }
  */

  // PUT: CustomerApi/1
  // Modify personnal info of a customer
  async PutCustomer(customerId, data) {
    const query = `CustomerApi/${customerId}`;
    const response = await Service.putFromApi(root + query, data);
    return this.createCustomer(response);
  }
  /* TEST on Postman
  PUT : {root}/CustomerApi/1
  {
      "Id":1,
      "Username" : "test",
      "FirstName" : "test",
      "LastName" : "test",
      "Email" : "test",
      "Password" : "test"
  }
  */

  // DELETE: CustomerApi/3
  // Delete a customer from the DB
  async DeleteCustomer(customerId) {
    const query = `CustomerApi/${customerId}`;
    await Service.deleteFromApi(root + query);
  }

  // Creation of an object customer
  createCustomer(customer) {
    return new Customer(
      customer.id,
      customer.username,
      customer.firstName,
      customer.lastName,
      customer.email,
      customer.password
    );
  }

  // Create a Customer model object list from the array returned by API
  createCustomers(customers) {
    // Create a customer object for each element in the array
    return customers.map((customer) => this.createCustomer(customer));
  }
}
export default new CustomerService();
