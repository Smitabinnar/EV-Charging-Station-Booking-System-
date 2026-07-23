INSERT INTO Users (full_name, email, phone, password)
VALUES
('Smita Binnar', 'smita@gmail.com', '9876543210', 'password123'),
('Rahul Sharma', 'rahul@gmail.com', '9876543211', 'password123'),
('Priya Patel', 'priya@gmail.com', '9876543212', 'password123');

INSERT INTO Chargers
(station_id, charger_number, charger_type, connector_type, power_output, status)
VALUES
(1, 'CH-001', 'DC Fast', 'CCS2', 60.00, 'Available'),

(1, 'CH-002', 'AC', 'Type 2', 22.00, 'Occupied'),

(2, 'CH-003', 'DC Fast', 'CCS2', 120.00, 'Available'),

(2, 'CH-004', 'AC', 'Type 2', 30.00, 'Maintenance');