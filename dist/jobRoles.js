import { init } from "./index.js";
import inquirer from "inquirer";
import pool from "./connection.js";

function viewAllRoles() {
  pool.query(`SELECT * FROM jobRoles`, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    init();
  });
}

function addRole() {
  pool.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    const departments = res.rows.map((department) => ({
      name: department.departmentName,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter role title:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter salary for role:",
        },
        {
          type: "list",
          name: "department_id",
          message: "Select department for role:",
          choices: departments,
        },
      ])
      .then((answer) => {
        pool.query(
          "INSERT INTO jobRoles (title, salary, department_id) VALUES ($1, $2, $3)",
          [answer.title, answer.salary, answer.department_id],
          (err, __res) => {
            if (err) throw err;
            console.log("Role added");
            init();
          }
        );
      });
  });
}

function updateRole() {
  pool.query("SELECT * FROM jobRoles", (err, res) => {
    if (err) throw err;
    const employees = res.rows.map((employee) => ({
      name: `${employee.employeeFirstName} ${employee.employeeLastName}`,
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

function deleteRole() {
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
          name: "roleID",
          message: "Select the role you want to delete:",
          choices: roles,
        },
      ])
      .then((answer) => {
        pool.query(
          "DELETE FROM jobRoles WHERE id = $1",
          [answer.roleID],
          (err, __res) => {
            if (err) throw err;
            console.log("Role deleted");
            init();
          }
        );
      });
  });
}

export { viewAllRoles, addRole, updateRole, deleteRole };
