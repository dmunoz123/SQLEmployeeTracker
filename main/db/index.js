const connection = require("./connection");

class DB {
  // referencing the connection inside the class for later usage
  constructor(connection) {
    this.connection = connection;
  }

  listAllEmployees() {
    return this.connection.promise().query("");
  }
}
