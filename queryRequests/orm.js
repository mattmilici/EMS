const mysql = require("mysql");

const connectionConfig = {
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "employeedb",
};
var connection = mysql.createConnection(connectionConfig);

var orm = {
    // ------------------
    //Allow you to select what table (department, employee, role) that you want to see
    SelectTableView: function viewByTable(answer) {
        return new Promise(function(resolve, reject) {
            connection.query(`SELECT * FROM ??;`, [answer], function(error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    },
    // ------------------

    // ------------------
    //Allow you to delete an employee
    deleteEmployee: function deleteEmployee(firstName, lastName) {
        return new Promise(function(resolve, reject) {
            connection.query(
                `DELETE FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, [firstName, lastName],
                function(error, data) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    },

    // ------------------

    // ------------------
    //Allows you to get a consolidated list of employees
    employeesFullName: function getEmployees() {
        return new Promise(function(resolve, reject) {
            connection.query(
                "SELECT CONCAT(employee.first_name, ' ', employee.last_name) as full_name, employee.id as id FROM employee WHERE first_name OR last_name IS NOT NULL",
                function(error, data) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    },

    // ------------------

    CompanyDetailByEmployee: function CompanyDetailByEmployee(callback) {
        return new Promise(function(resolve, reject) {
            connection.query(
                `SELECT e.id as id, e.first_name as first_name, e.last_name as last_name, role.title as title, department.name as department, role.salary as salary, CONCAT(m.first_name,' ', m.last_name ) AS 'Manager' FROM employee e
                INNER JOIN role ON role.id = e.role_id INNER JOIN department ON department.id = role.department_id left JOIN employee m ON m.id = e.manager_id;`,
                function(error, data) {
                    if (error) {
                        reject(error);
                    } else {
                        console.table(data);
                        resolve(data);
                        callback();
                    }
                }
            );
        });
    },
    // ------------------

    // ------------------
    EmployeesByID: function EmployeesByID(answer) {
        return new Promise(function(resolve, reject) {
            connection.query(
                `SELECT e.id as id, e.first_name as first_name, e.last_name as last_name, role.title as title, department.name as department, role.salary as salary,
                CONCAT(m.first_name,' ', m.last_name ) AS 'Manager' FROM employee e INNER JOIN role ON role.id = e.role_id INNER JOIN department ON department.id = role.department_id
            left JOIN employee m ON m.id = e.manager_id WHERE department.name = ?;`, [answer],
                function(error, data) {
                    if (error) {
                        reject(error);
                    } else {
                        console.table(data);
                        resolve(data);
                    }
                }
            );
        });
    },

    // ------------------

    // ------------------
    addnewEmployee: function addEmployee(firstName, lastName, roleID, managerID) {
        return new Promise(function(resolve, reject) {
            connection.connect(function() {
                connection.query(
                    `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)`, [firstName, lastName, roleID, managerID],
                    function(error, data) {
                        if (error) {
                            reject(error);
                        } else {
                            console.table(data);
                            resolve(data);
                        }
                    }
                );
            });
        });
    },

    // ------------------

    // ---------------
    getDepartments: function getdepartments(query) {
        return new Promise(function(resolve, reject) {
            connection.query(query, function(error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    },
    // ---------------

    listOfDepartments: function departmentList() {
        return new Promise(function(resolve, reject) {
            connection.query(`SELECT * FROM role`, function(error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    },

    listOfEmployees: function employeeList() {
        return new Promise(function(resolve, reject) {
            connection.query(
                `SELECT * FROM employee WHERE first_name IS NOT NULL`,
                function(error, data) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    },
    updateEmployee: function updateEmployee(roleid, managerid, employeeid) {
        return new Promise(function(resolve, reject) {
            connection.query(
                "UPDATE employee SET employee.role_id = ?, employee.manager_id = ? WHERE employee.id = ?", [roleid, managerid, employeeid],
                function(error, data) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    },

    addDepartment: function addDepartment(name) {
        return new Promise(function(resolve, reject) {
            connection.query(
                `INSERT INTO department(name) VALUE (?)`, [name],
                function(error, data) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    },
    addRole: function addRole(title, salary, department) {
        return new Promise(function(resolve, reject) {
            connection.query(
                `INSERT INTO role(title, salary, department_id) VALUE (?, ?, ?)`, [title, salary, department],
                function(error, data) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    },
};

module.exports = orm;