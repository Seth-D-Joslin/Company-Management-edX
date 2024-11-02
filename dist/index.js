import inquirer from "inquirer";
import { viewAllEmployees, addEmployee, updateEmployee, deleteEmployee } from './employees.js';
import { viewAllRoles, addRole, updateRole, deleteRole } from './jobRoles.js';
import { viewAllDepartments, addDepartment, updateDepartment, deleteDepartment } from "./departments.js";

function init() {
    inquirer
        .prompt([
          {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee', 'Delete Employee',  'View All Roles', 'Add Role', 'Update Role', "Delete Role",'View All Departments','Add Department', 'Update Department', 'Delete Department','Quit'],
            name: 'Choices',
          }      
        ])
        .then((data) => {
          switch(data.Choices) {
            case 'View All Employees':
              viewAllEmployees();
              break;
            case 'Add Employee':
              addEmployee();
              break;
            case 'Update Employee':
              updateEmployee();
              break;
            case 'Delete Employee':
              deleteEmployee();
              break;
            case 'View All Roles':
              viewAllRoles();
              break;
            case 'Add Role':
              addRole();
              break;
            case 'Update Role':
              updateRole();
              break;
            case 'Delete Role':
              deleteRole();
              break;
            case 'View All Departments':
              viewAllDepartments();
              break;
            case 'Add Department':
              addDepartment();
              break;
            case 'Update Department':
              updateDepartment();
              break;
            case 'Delete Department':
              deleteDepartment();
            case 'Quit':
              process.exit();
          }
          console.log(data);
        });
      }

init();

export { init };