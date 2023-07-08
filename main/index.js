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
  
}

viewRoles() {

}

viewEmployees() {

}

addDepartment() {

}

addEmployee() {

}

updateRole() {

}

quit() {
  console.log("It was fun browsing the company with you :) ");
  process.exit();
}


