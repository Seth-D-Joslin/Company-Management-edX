import { init } from "./index.js";
import inquirer from "inquirer";
import pool from "./connection.js";

function viewAllEmployees() {
  pool.query(`SELECT * FROM employees`, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    init();
  });
}

function addEmployee() {
  pool.query("SELECT * FROM jobRoles", (err, res) => {
    if (err) throw err;
    const roles = res.rows.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    pool.query("SELECT * FROM employees", (err, res) => {
      if (err) throw err;
      const managers = res.rows.map((employee) => ({
        name: `${employee.employeeFirstName} ${employee.employeeLastName}`,
        value: employee.id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "employeeFirstName",
            message: "Enter employee first name:",
          },
          {
            type: "input",
            name: "employeeLastName",
            message: "Enter employee last name:",
          },
          {
            list: "list",
            name: "roleID",
            message: "Select employee role:",
            choices: roles,
          },
          {
            type: "list",
            name: "managerID",
            message: "Select employee manager:",
            choices: managers,
          },
        ])
        .then((data) => {
          pool.query(
            "INSERT INTO employees (employeeFirstName, employeeLastName, roleID, managerID VALUES ($1, $2, $3, $4)",
            [
              data.employeeFirstName,
              data.employeeLastName,
              data.roleID,
              data.managerID,
            ],
            (err, __res) => {
              if (err) throw err;
              console.log("Employee added");
              init();
            }
          );
        });
    });
  });
}

function updateEmployee() {
  pool.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    const employees = res.rows.map((employee) => ({
      name: `${employee.firstName} ${employee.lastName}`,
      value: employee.id,
    }));
    pool.query("SELECT * FROM jobRoles", (err, res) => {
      if (err) throw err;
      const roles = res.rows.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeID",
            message: "Select employee to update:",
            choices: employees,
          },
          {
            type: "list",
            name: "roleID",
            message: "Select new role for employee:",
            choices: roles,
          },
        ])
        .then((data) => {
          pool.query(
            "UPDATE employees SET roleID = $1 WHERE id = $2",
            [data.roleID, data.employeeID],
            (err, __res) => {
              if (err) throw err;
              console.log("Employee updated");
              init();
            }
          );
        });
    });
  });
}

function deleteEmployee() {
  pool.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    const employees = res.rows.map((employee) => ({
      name: `${employee.firstName} ${employee.lastName}`,
      value: employee.id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeID",
          message: "Select employee to delete:",
          choices: employees,
        },
      ])
      .then((answer) => {
        pool.query(
          "DELETE FROM employees WHERE id = $1",
          [answer.employeeID],
          (err, __res) => {
            if (err) throw err;
            console.log("Employee deleted");
            init();
          }
        );
      });
  });
}

export { viewAllEmployees, addEmployee, updateEmployee, deleteEmployee };
