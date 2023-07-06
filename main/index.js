const inquirer = require("inquirer");
const logo = require("asciiart-logo");

//load entire db folder into const
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
          name: "View All Departments"
        },
        {
          name: "View All Roles"
        },
        {
          name: "View All Employees"
        },
        {
          name: "Add A Department"
        },
        {
          name: "Add An Employee"
        },
        {
          name: "Update An Employee Role"
        }
        {
          name: "Quit?"
        }
      ]
    }
  ]).then(res => {
    let userChoice = res.choice;

  })
}


