SELECT * FROM departments
JOIN jobRoles ON departments.id = jobRoles.department_id
JOIN employees ON jobRoles.id = employees.roleID;