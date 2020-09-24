DROP DATABASE IF EXISTS  employeedb;
CREATE database employeedb;
USE employeedb;
CREATE TABLE department
(
    id INT
    AUTO_INCREMENT NOT NULL,
    name VARCHAR
    (30),
    PRIMARY KEY
    (id)
);
    CREATE TABLE role
    (
        id INT
        AUTO_INCREMENT NOT NULL,
    title VARCHAR
        (30),
    salary DECIMAL,
    department_id INT
        (10),
    PRIMARY KEY
        (id)
);
        CREATE TABLE employee
        (
            id INT
            AUTO_INCREMENT NOT NULL,
    first_name VARCHAR
            (30),
    last_name VARCHAR
            (30),
    role_id INT
            (10),
    manager_id INT
            (10),
    PRIMARY KEY
            (id)
);


            INSERT INTO department
                (name)
            VALUES
                ("Engineering");
            INSERT INTO department
                (name)
            VALUES
                ("Operations");
            INSERT INTO department
                (name)
            VALUES
                ("Finance");
            INSERT INTO department
                (name)
            VALUES
                ("Marketing");
            INSERT INTO department
                (name)
            VALUES
                ("Sales");
            INSERT INTO department
                (name)
            VALUES
                ("Legal");
            INSERT INTO department
                (name)
            VALUES
                ("Procurement");

            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Lead Engineer", 150000, 1);
            INSERT INTO role
                (title, salary, department_id)
            VALUE
            ("Software Engineer",
            100000,
            1
            );
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Hardware Engineer", 90000, 1);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Test Engineer", 850000, 1);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Operations Manager", 105000, 2);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Operations Analyst", 650000, 2);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Financial Manager", 110000, 3);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Financial Analyst I", 60000, 3);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Financial Analyst II", 65000, 3);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Events Coordinator", 150000, 4);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Marketing Analyst", 55000, 4);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("PR Specialist", 75000, 4);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Sales Manager", 85000, 5);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Sales Analyst", 60000, 5);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Lawyer", 150000, 6);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Procurment Management", 95000, 7);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Buyer", 75000, 7);
            INSERT INTO role
                (title, salary, department_id)
            VALUES
                ("Senior Buyer", 85000, 7);






            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Matt",
            "Milici",
            1,
            null
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Ryan",
            "Gleason",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Dennis",
            "Goldin",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Dan",
            "Chilson",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Geoff",
            "Fieler",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Mark",
            "Remmey",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Will",
            "Dempster",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Ryan",
            "Browne",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Tommy",
            "Locher",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Trent",
            "Melsh",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Alexa",
            "Murrman",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Madi",
            "Milici",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Helen",
            "Stringer",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Megan",
            "Smith",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Sam",
            "Darnold",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Saquon",
            "Barkley",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Jamie",
            "Foxx",
            2,
            1
            );
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUE
            ("Kayne",
            "Wes",
            2,
            1
            );