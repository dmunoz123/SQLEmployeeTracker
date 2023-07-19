const { prompt } = require("inquirer");
const logo = require("asciiart-logo");

//load db folder contents
const db = require("./db");

function init() {
  console.log(
    logo({
      name: "Awesome Employee Tracker",
      font: "Speed",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "grey",
      logoColor: "red",
      textColor: "black",
    })
  );

  loadUserPrompts();
}

function loadUserPrompts() {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Please choose an option.'
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add A Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add An Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update An Employee Role",
          value: "UPDATE_ROLE"
        }
        {
          name: "Quit?",
          value: "QUIT"
        }
      ]
    }
  ]).then(res => {
    // save the chosenn option into userChoice
    let userChoice = res.choice;

    // object creation which maps each option to a function which will render the chosen data (for later usage)
    const choiceToFunction = {
      VIEW_DEPARTMENTS: viewDepartments,
      VIEW_ROLES: viewRoles,
      VIEW_EMPLOYEES: viewEmployees,
      ADD_DEPARTMENT: addDepartment,
      ADD_EMPLOYEE: addEmployee,
      UPDATE_ROLE: updateRole,
      QUIT: quit
    };

    // check to make sure user chose a valid option, otherwise return error
    if (choiceToFunction.hasOwnProperty(choice)) {
      // calling relative function based on user choice
      choiceToFunction[choice]();
    } else {
      console.log("Invalid choice! You must choose from the options listed.")
    }
  });
}

viewDepartments() {
  try{
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

viewRoles() {
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

viewEmployees() {

}

addDepartment() {
  try {
    prompt([
    { 
      name: "department-name",
      message: "What is the name of the department?"
    }
  ]);
  const name = res.name
  await db.newDepartment(name);
  console.log(`Added ${name} to the database`);
  loadUserPrompts();
  } catch (error) {
    console.error("Error adding the department:", error);
    throw error;
  }
}

addEmployee() {

}

updateRole() {
  try {
    const [rows] = await db.findAllDepartments();
    const departments = rows;
    const departmentChoices = departments.map(({ id, name}) => ({
      name: name,
      value: id
    }));

    const role = await prompt([
      {
        name: "title",
        message: "What is the name of the role?"
      },
      {
        name: "salary",
        message: "What is the salary of the role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        //offers the user a list of the different departments available to chose from
        choices: departmentChoices
      }
    ]);

    await db.newRole(role);
    console.log(`Added ${role.title} to the database`);
    loadUserPrompts();
  } catch (error) {
    console.error("Error adding the role:", error);
    throw error;
  }
}

quit() {
  console.log("It was fun browsing the company with you :) ");
  process.exit();
}


