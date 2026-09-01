CREATE TABLE Users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

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