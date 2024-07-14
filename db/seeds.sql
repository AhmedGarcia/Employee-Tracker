-- Insert initial department
INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Finance');

-- INsert initial roles with department references
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Sales Manager', 80000, 2),
('Accountant', 70000, 3);

-- Insert initial employees with role references, with the manager_id NULL.
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Pedro', 'Garcia', 1, NULL),
('Xavier', 'Ramos', 2, NULL),
('PJ', 'Diaz', 3, NULL);