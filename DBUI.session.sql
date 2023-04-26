DROP DATABASE IF EXISTS DBUI;
CREATE DATABASE IF NOT EXISTS DBUI;
USE DBUI;
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  age INT NULL,
  admin BOOLEAN NULL DEFAULT FALSE,
  nickname VARCHAR(50) NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(10),
  email  VARCHAR(255),
  setPrivate  BOOLEAN NULL DEFAULT FALSE,
  PRIMARY KEY (user_id),
  UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS friends (
  friend_id INT NOT NULL AUTO_INCREMENT,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  date_added DATETIME NOT NULL,
  PRIMARY KEY (friend_id),
  UNIQUE KEY (user1_id, user2_id),
  FOREIGN KEY (user1_id) REFERENCES users(user_id),
  FOREIGN KEY (user2_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS transactions (
  transaction_id INT NOT NULL AUTO_INCREMENT,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATETIME NOT NULL,
  status ENUM('pending', 'completed', 'failed') NOT NULL,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (sender_id) REFERENCES users(user_id),
  FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id INT NOT NULL AUTO_INCREMENT,
  payment_request_id INT NOT NULL,
  payment_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (payment_id),
  FOREIGN KEY (payment_request_id) REFERENCES transactions(transaction_id)
);



INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('admin', 'password', 'Admin', 'Admin', 21, 1, 'Admin', '0000000000', 'admin@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('cirenio', 'cirenio', 'Cirenio', 'Lopez', 21, 0, 'Cirenio', '2142906697', 'cblopez@smu.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('ford', 'ford', 'Ford', 'Jackson', 21, 0, 'Ford', '0000000000', 'example@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('kevin', 'kevin', 'Kevin', 'Jarquin', 21, 0, 'Kevin', '0000000000', 'example@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('rafe', 'rafe', 'Rafe', 'Forward', 21, 0, 'Rafe', '0000000000', 'example@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('ridhi', 'ridhi', 'Ridhi', 'Ralli', 21, 0, 'Ridhi', '0000000000', 'example@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('simba', 'simba', 'Simba', 'Masters', 21, 0, 'Simba', '0000000000', 'example@example.com', 0);
INSERT INTO friends (user1_id, user2_id, date_added) VALUES (2, 1, CURRENT_TIMESTAMP);
INSERT INTO friends (user1_id, user2_id, date_added) VALUES (2, 3, CURRENT_TIMESTAMP);
INSERT INTO friends (user1_id, user2_id, date_added) VALUES (2, 4, CURRENT_TIMESTAMP);
INSERT INTO friends (user1_id, user2_id, date_added) VALUES (2, 5, CURRENT_TIMESTAMP);
INSERT INTO friends (user1_id, user2_id, date_added) VALUES (2, 6, CURRENT_TIMESTAMP);
INSERT INTO friends (user1_id, user2_id, date_added) VALUES (2, 7, CURRENT_TIMESTAMP);
