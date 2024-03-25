// Creation of a service to interact with the DB with
// actions : fetch, put, post, delete
class Service {
  async fetchFromApi(query) {
    // console.log(`Fetching API with query : ${query}`);
    try {
      const response = await fetch(query);
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  async putFromApi(query, data) {
    // console.log(`Putting API with query : ${query}`);
    try {
      const response = await fetch(query, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  async postFromApi(query, data) {
    // console.log(`Posting API with query : ${query}`);
    try {
      const response = await fetch(query, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  async deleteFromApi(query) {
    // console.log(`Deleting API with query : ${query}`);
    try {
      await fetch(query, {
        method: "DELETE",
      });
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

// Export an instance of the class Service
export default new Service();
