import { init } from "./index.js";
import inquirer from "inquirer";

function viewAllDepartments() {
  pool.query(`SELECT * FROM departments`, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    init();
  });
}

function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Enter department's name:",
        },
      ])
      .then((data) => {
        pool.query(
          "INSERT INTO departments (departmentName VALUES ($1)",
          [data.departmentName],
          (err, __res) => {
            if (err) throw err;
            console.log("Department added");
            init();
          }
        );
      });
}

function updateDepartment() {
  pool.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    const departments = res.rows.map((department) => ({
      name: `${department.departmentName}`,
      value: department.id
    }));
    inquirer
    .prompt([
      {
        type: 'list',
        name: 'departmentID',
        message: 'Select department to update:',
        choices: departments,
      }
  ])
  .then((data) => {
    pool.query('UPDATE departments SET id = $1 WHERE id = $2', [data.departmentID], (err, __res) => {
      if (err) throw err;
      console.log(`department updated`);
      init();
    });
  });
  });
}

function deleteDepartment() {
    pool.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        const departments = res.rows.map((department) => ({
            name: department.departmentName,
            value: department.id
        }));
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'departmentID',
                message: 'Select department to be deleted:',
                choices: departments
            }
        ])
        .then((data) => {
          pool.query('DELETE FROM departments WHERE id = $1', [data.departmentID], (err, __res) => {
            if (err) throw err;
            console.log('Department deleted');
            init();
          });
        });
    });
}

export { viewAllDepartments, addDepartment, updateDepartment, deleteDepartment };
