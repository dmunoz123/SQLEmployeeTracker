const { prompt } = require("inquirer");
const logo = require("asciiart-logo");

//load db folder contents
const db = require("./db");

init();

function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadUserPrompts();
}

function loadUserPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Please choose an option.",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add A Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Add An Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update An Employee Role",
          value: "UPDATE_ROLE",
        },
        {
          name: "Quit?",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    // save the chosenn option into Choice
    let choice = res.choice;

    // object creation which maps each option to a function which will render the chosen data (for later usage)
    const choiceToFunction = {
      VIEW_DEPARTMENTS: viewDepartments,
      VIEW_ROLES: viewRoles,
      VIEW_EMPLOYEES: viewEmployees,
      ADD_DEPARTMENT: addDepartment,
      ADD_EMPLOYEE: addEmployee,
      UPDATE_ROLE: updateRole,
      QUIT: quit,
    };

    // check to make sure user chose a valid option, otherwise return error
    if (choiceToFunction.hasOwnProperty(choice)) {
      // calling relative function based on user choice
      choiceToFunction[choice]();
    } else {
      console.log("Invalid choice! You must choose from the options listed.");
    }
  });
}

async function viewDepartments() {
  try {
    const [rows] = await db.findAllDepartments();
    let departments = rows;
    console.log("\n");
    console.table(departments);
    loadUserPrompts();
  } catch (error) {
    console.error("Error viewing all of the departments:", error);
    throw error;
  }
}

async function viewRoles() {
  try {
    const [rows] = await db.findAllRoles();
    let roles = rows;
    console.log("\n");
    console.table(roles);
    loadUserPrompts();
  } catch (error) {
    console.error("Error viewing all of the roles:", error);
    throw error;
  }
}

async function viewEmployees() {
  try {
    const [rows] = await db.listAllEmployees();
    let employees = rows;
    console.log("\n");
    console.table(employees);
    await loadUserPrompts();
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}

async function addDepartment() {
  try {
    const res = await prompt([
      {
        name: "name",
        message: "What is the name of the department?",
      },
    ]);

    const name = res;
    await db.newDepartment(name);
    console.log(`Added ${name.name} to the database`);
    await loadUserPrompts();
  } catch (error) {
    console.error("Error adding department:", error);
  }
}

async function addEmployee() {
  try {
    const res = await prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        message: "What is the employee's last name?",
      },
    ]);

    const first_name = res.first_name;
    const last_name = res.last_name;

    const [roleRows] = await db.findAllRoles();
    const roles = roleRows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    const roleRes = await prompt({
      type: "list",
      name: "roleId",
      message: "What is the employee's role?",
      choices: roleChoices,
    });

    const roleId = roleRes.roleId;

    const [employeeRows] = await db.listAllEmployees();
    const employees = employeeRows;
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    managerChoices.unshift({ name: "None", value: null });

    const managerRes = await prompt({
      type: "list",
      name: "managerId",
      message: "Who is the employee's manager?",
      choices: managerChoices,
    });

    const employee = {
      manager_id: managerRes.managerId,
      role_id: roleId,
      first_name: first_name,
      last_name: last_name,
    };

    await db.newEmployee(employee);
    console.log(`Added ${first_name} ${last_name} to the database`);
    await loadUserPrompts();
  } catch (error) {
    console.error("Error adding employee: ", error);
  }
}

async function updateRole() {
  try {
    const [rows] = await db.findAllDepartments();
    const departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    const role = await prompt([
      {
        name: "title",
        message: "What is the name of the role?",
      },
      {
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        //offers the user a list of the different departments available to chose from
        choices: departmentChoices,
      },
    ]);

    await db.newRole(role);
    console.log(`Added ${role.title} to the database`);
    loadUserPrompts();
  } catch (error) {
    console.error("Error adding the role:", error);
    throw error;
  }
}

function quit() {
  console.log("It was fun browsing the company with you :) ");
  process.exit();
}
