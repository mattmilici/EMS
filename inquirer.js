const mysql = require("mysql");
const inquirer = require("inquirer");
const viewAllEmployeesQuery = require("./queryRequests/viewAllEmployeesQuery");
const viewEmployeesByDepartment = require("./queryRequests/viewAllEmployeesByDeptarment");
const getdepartments = require("./queryRequests/listOfDepartments");
const getEmployees = require("./queryRequests/listOfEmployees");
const deleteEmployee = require("./queryRequests/deleteEmployee");
const addEmployee = require("./queryRequests/addEmployee");

// kickOff();

function kickOff() {
    inquirer
        .prompt([{
            name: "startingPrompt",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
            ],
        }, ])
        .then(function(response) {
            const answer = response.startingPrompt;
            switch (answer) {
                case "View All Employees":
                    //displays table of all employees
                    viewAllEmployeesQuery();
                    break;
                case "View All Employees by Department":
                    viewAllEmpByDep();
                    break;
                case "View All Employees by Manager":
                    break;
                case "Add Employee":
                    addNewemployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    break;
                case "Update Employee Manager":
                    break;
            }
        });
}

//prompt generated if the user selects to view employees by deparment
function viewAllEmpByDep() {
    let departmentArray = [];
    getdepartments("SELECT department.name FROM department")
        .then((message) => {
            for (let i = 0; i < message.length; i++) {
                let department = message[i].name;
                departmentArray.push(department);
            }
            inquirer
                .prompt([{
                    name: "viewbyDepartment",
                    type: "list",
                    message: "What department do you want to filter on?",
                    choices: departmentArray,
                }, ])
                .then(function(response) {
                    const answer = response.viewbyDepartment;
                    viewEmployeesByDepartment(answer);
                });
        })
        .catch(function(error) {
            console.log("not Working");
        });
}

//remove an employee
function removeEmployee() {
    let EmployeeArray = [];
    getEmployees(
            "SELECT CONCAT(employee.first_name, ' ', employee.last_name) as full_name FROM employee"
        )
        .then((message) => {
            for (let i = 0; i < message.length; i++) {
                let employee = message[i].full_name;
                EmployeeArray.push(employee);
            }
            inquirer
                .prompt([{
                    name: "viewEmployees",
                    type: "list",
                    message: "What employee do you want to remove?",
                    choices: EmployeeArray,
                }, ])
                .then(function(response) {
                    const answer = response.viewEmployees;
                    let nameSplit = answer.split(" ");
                    deleteEmployee(nameSplit[0], nameSplit[1]);
                });
        })
        .catch(function(error) {
            console.log("not Working");
        });
}

//add employee
function addNewemployee() {
    inquirer
        .prompt([{
                name: "newEmployeeFirstName",
                type: "input",
                message: "What is the employees first name?",
            },
            {
                name: "newEmployeeLastName",
                type: "input",
                message: "What is the employees last name?",
            },
            {
                name: "newEmployeeroleID",
                type: "input",
                message: "What is the employees role_id?",
            },
            {
                name: "newEmployeeManagerID",
                type: "input",
                message: "What is the employees Manager ID?",
            },
        ])
        .then(function(data) {
            addEmployee(
                data.newEmployeeFirstName,
                data.newEmployeeLastName,
                data.newEmployeeroleID,
                data.newEmployeeManagerID
            );
        });
}

addNewemployee();