const mysql = require("mysql");

const connectionConfig = {
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "employeedb",
};
var connection = mysql.createConnection(connectionConfig);

module.exports = function getEmployees(query) {
    return new Promise(function(resolve, reject) {
        connection.query(query, function(error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};