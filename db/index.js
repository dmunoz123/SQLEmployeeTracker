const connection = require("./connection");

class DB {
  // referencing the connection inside the class for later usage
  constructor(connection) {
    this.connection = connection;
  }

  listAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }

  findAllDepartments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
  }

  newDepartment(department) {
    return this.connection.promise().query(
      // will insert the user's chosen department (with name) as the new department created
      "INSERT INTO department SET ?",
      department
    );
  }

  newEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  newRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }
}

module.exports = new DB(connection);
