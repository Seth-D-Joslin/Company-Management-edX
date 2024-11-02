INSERT INTO department (departmentName)
VALUES ('Graphic Design', 'Animation', 'Story Writer', 'Public Relations', 'Web Development');

INSERT INTO jobRole (title, salary, department_id)
VALUES ('Lead Designer', 120000, 1),
('Design Scrub Master', 800000, 1),
('Lead Animator', 160000, 2),
('Animation Scrub Master', 90000, 2),
('Lead Writer', 100000, 3),
('Lead Editor', 70000, 3),
('Executive Director', 90000, 4),
('Marketing Specialist', 75000, 4),
('Lead Developer', 100000, 5),
('Developer Scrub Master', 80000, 5);

INSERT INTO employee 
(employeeFirstName, employeeLastName, roleID, managerID);
VALUES ('Johnny', "B'Good", 1, NULL),
('Johnny', 'Goodtime', 1, 1),
('Big', 'John', 2, NULL),
('Powerful', 'Jon', 2, 2),
("Go'Johnny", "Go'Go", 3, NULL),
('John', 'Wayne', 4, NULL),
('John', 'Wick', 4, 4),
('John', "F'Kennedy", 5, NULL),
('John', 'Doe', 5, 5);
