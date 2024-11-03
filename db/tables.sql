CREATE TABLE departments(
    id SERIAL PRIMARY KEY,
    departmentName VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE jobRoles(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    employeeFirstName VARCHAR(30) NOT NULL,
    employeeLastName VARCHAR(30) NOT NULL,
    roleID INTEGER NOT NULL,
    managerID INTEGER,
    FOREIGN KEY (roleID) REFERENCES jobRoles(id),
    FOREIGN KEY (managerID) REFERENCES employees(id)
);