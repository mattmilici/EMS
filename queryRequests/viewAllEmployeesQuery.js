const mysql = require("mysql");

const connectionConfig = {
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "employeedb",
};

module.exports = function viewAllEmployeesQuery() {
    var connection = mysql.createConnection(connectionConfig);

    connection.connect(function() {
        connection.query(
            `SELECT
            e.id as id,
            e.first_name as first_name,
            e.last_name as last_name,
            role.title as title,
            department.name as department,
            role.salary as salary,
            CONCAT(m.first_name,' ', m.last_name ) AS 'Manager'
        FROM employee e
        INNER JOIN role ON
            role.id = e.role_id
        INNER JOIN department ON 
            department.id = role.department_id
        left JOIN employee m ON 
            m.id = e.manager_id;`,
            function(error, data) {
                console.table(data);
            }
        );
    });
};