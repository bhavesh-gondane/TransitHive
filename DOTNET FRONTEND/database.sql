-- Create database
CREATE DATABASE IF NOT EXISTS transithive;
USE transithive;

-- Users table
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Vendors table
CREATE TABLE vendors (
  vendor_id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  gstin VARCHAR(15) UNIQUE NOT NULL,
  company_owner_name VARCHAR(255) NOT NULL,
  owner_aadhar_number VARCHAR(12) UNIQUE NOT NULL,
  pan_number VARCHAR(10) UNIQUE NOT NULL,
  city VARCHAR(50) NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin table
CREATE TABLE admin (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  vendor_id INT,
  pickup_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  booking_date DATE NOT NULL,
  preferred_time VARCHAR(50),
  goods_type VARCHAR(100) NOT NULL,
  weight DECIMAL(10,2),
  special_instructions TEXT,
  status ENUM('pending', 'assigned', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id)
);