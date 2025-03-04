CREATE DATABASE IF NOT EXISTS `chat`;

USE `chat`;

CREATE TABLE ChatLog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username CHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BannedUsers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username CHAR(50) NOT NULL,
    banned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);