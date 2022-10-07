INSERT INTO department(name)
VALUES
("Executives"), 
("Management"), 
("Sales"), 
("Fetch");

INSERT INTO role(title, salary, department_id)
VALUES
("CEO", 150000, 1), 
("Project Manager", 125000, 2), 
("Sales Lead", 100000, 3), 
("SDR", 50000, 4);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'Kolby', 'Kimball', 1, 1), 
(2, 'Janessa', 'Kimball', 2, 2), 
(3, 'Nala', 'Bear', 3, 3), 
(4, 'Indy', 'Girl', 4, 4); 

