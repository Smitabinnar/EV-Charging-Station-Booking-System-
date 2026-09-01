CREATE DATABASE ev_charging_system;
USE ev_charging_system;
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE Users;
SHOW TABLES;
CREATE TABLE Vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_number VARCHAR(20) NOT NULL UNIQUE,
    vehicle_name VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    battery_capacity DECIMAL(5,2) NOT NULL,
    vehicle_type VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

SELECT*FROM Users;

DESCRIBE Vehicles;

CREATE TABLE Vehicles (

    vehicle_id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    vehicle_number VARCHAR(20) NOT NULL UNIQUE,

    vehicle_type VARCHAR(50) NOT NULL,

    company VARCHAR(100),

    model VARCHAR(100),

    battery_capacity DECIMAL(5,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES Users(user_id)
        ON DELETE CASCADE

);
sos_requests

CREATE TABLE ChargingStations (
    station_id INT AUTO_INCREMENT PRIMARY KEY,
    station_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    contact_number VARCHAR(15),
    opening_time TIME NOT NULL,
    closing_time TIME NOT NULL,
    status ENUM('Open','Closed','Maintenance') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE ChargingStations;
CREATE TABLE Chargers (
    charger_id INT AUTO_INCREMENT PRIMARY KEY,
    station_id INT NOT NULL,
    charger_number VARCHAR(20) NOT NULL UNIQUE,
    charger_type ENUM('AC','DC') NOT NULL,
    connector_type VARCHAR(30) NOT NULL,
    power_output DECIMAL(5,2) NOT NULL,
    status ENUM('Available','Occupied','Maintenance') DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (station_id)
        REFERENCES ChargingStations(station_id)
);
DESCRIBE Chargers; ;
CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    station_id INT NOT NULL,
    charger_id INT NOT NULL,

    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    booking_status ENUM('Pending','Confirmed','Cancelled','Completed')
        DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES Users(user_id),

    FOREIGN KEY (vehicle_id)
        REFERENCES Vehicles(vehicle_id),

    FOREIGN KEY (station_id)
        REFERENCES ChargingStations(station_id),

    FOREIGN KEY (charger_id)
        REFERENCES Chargers(charger_id)
);

DESCRIBE Bookings;

CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,

    booking_id INT NOT NULL,

    amount DECIMAL(10,2) NOT NULL,

    payment_method ENUM(
        'UPI',
        'Credit Card',
        'Debit Card',
        'Net Banking',
        'Wallet'
    ) NOT NULL,

    payment_status ENUM(
        'Pending',
        'Success',
        'Failed'
    ) DEFAULT 'Pending',

    transaction_id VARCHAR(100) UNIQUE,

    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (booking_id)
        REFERENCES Bookings(booking_id)
);

DESCRIBE Payments;

CREATE TABLE ChargingSessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,

    booking_id INT NOT NULL,

    session_start DATETIME NOT NULL,

    session_end DATETIME,

    energy_consumed DECIMAL(8,2),

    total_cost DECIMAL(10,2),

    session_status ENUM(
        'Started',
        'Completed',
        'Stopped'
    ) DEFAULT 'Started',

    FOREIGN KEY (booking_id)
        REFERENCES Bookings(booking_id)
);

DESCRIBE ChargingSessions;

INSERT INTO Users (full_name, email, phone, password)
VALUES
('Smita Binnar', 'smita@gmail.com', '9876543210', 'password123'),
('Rahul Sharma', 'rahul@gmail.com', '9876543211', 'password123'),
('Priya Patel', 'priya@gmail.com', '9876543212', 'password123');

SELECT * FROM Users;

INSERT INTO Vehicles
(user_id, vehicle_number, vehicle_name, brand, battery_capacity, vehicle_type)
VALUES
(1, 'MH12AB1234', 'Nexon EV', 'Tata', 40.00, 'SUV'),
(2, 'MH14CD5678', 'ZS EV', 'MG', 50.30, 'SUV'),
(3, 'MH20EF9876', 'XUV400', 'Mahindra', 39.40, 'SUV');

SELECT * FROM Vehicles;

INSERT INTO ChargingStations
(station_name, address, city, state, pincode, latitude, longitude,
contact_number, opening_time, closing_time, status)
VALUES
('Tata Power Baner',
'Baner Road',
'Pune',
'Maharashtra',
'411045',
18.559000,
73.786800,
'9876500001',
'06:00:00',
'23:00:00',
'Open'),

('Jio-bp Hinjewadi',
'Hinjewadi Phase 1',
'Pune',
'Maharashtra',
'411057',
18.591200,
73.738900,
'9876500002',
'00:00:00',
'23:59:59',
'Open');

SELECT * FROM ChargingStations;

INSERT INTO Chargers
(station_id, charger_number, charger_type, connector_type, power_output, status)
VALUES
(1, 'CH-001', 'DC Fast', 'CCS2', 60.00, 'Available'),

(1, 'CH-002', 'AC', 'Type 2', 22.00, 'Occupied'),

(2, 'CH-003', 'DC Fast', 'CCS2', 120.00, 'Available'),

(2, 'CH-004', 'AC', 'Type 2', 30.00, 'Maintenance');

SELECT*FROM Chargers;

INSERT INTO Bookings
(user_id, vehicle_id, station_id, charger_id,
booking_date, start_time, end_time, booking_status)
VALUES
(1,1,1,1,'2026-07-24','10:00:00','11:00:00','Confirmed'),

(2,2,2,3,'2026-07-24','12:00:00','13:00:00','Completed'),

(3,3,1,2,'2026-07-25','15:00:00','16:00:00','Pending');

SELECT * FROM Bookings;

INSERT INTO Payments
(booking_id, amount, payment_method,
payment_status, transaction_id, payment_date)
VALUES
(1,350.00,'UPI','Success','TXN10001','2026-07-24'),

(2,420.00,'Credit Card','Success','TXN10002','2026-07-24'),

(3,0.00,'UPI','Pending','TXN10003','2026-07-25');

SELECT * FROM Payments;

INSERT INTO ChargingSessions
(booking_id, session_start, session_end,
energy_consumed, total_cost, session_status)
VALUES
(1,'2026-07-24 10:05:00','2026-07-24 10:55:00',18.50,350.00,'Completed'),

(2,'2026-07-24 12:02:00','2026-07-24 12:50:00',22.30,420.00,'Completed'),

(3,NULL,NULL,NULL,NULL,'Scheduled');

SELECT * FROM ChargingSessions;

DESCRIBE Chargers;

DESCRIBE Bookings;

SELECT * FROM Chargers;

SELECT * FROM Users;

SELECT * FROM Vehicles;

SELECT * FROM ChargingStations;

SELECT * FROM Chargers;

INSERT INTO Chargers
(
    station_id,
    charger_number,
    charger_type,
    connector_type,
    power_output,
    status
)
VALUES
(
    1,
    'A1',
    'DC',
    'CCS2',
    60.00,
    'Available'
);

SELECT DATABASE();


SELECT charger_id, station_id, charger_number
FROM Chargers;


SELECT *
FROM Chargers
WHERE charger_number = 'A1';

SELECT * FROM Bookings;

DESCRIBE Payments;

SELECT * FROM Payments;

DESCRIBE Payments;

SHOW COLUMNS FROM Payments;

SELECT * FROM ChargingSessions;

DESCRIBE ChargingSessions;

SELECT user_id, full_name, email, phone
FROM Users;

SELECT user_id, full_name, email, phone, password
FROM Users
WHERE user_id = 16;