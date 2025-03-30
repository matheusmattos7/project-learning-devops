CREATE DATABASE people_management;

USE people_management;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(45) NOT NULL,
    birth_date VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);