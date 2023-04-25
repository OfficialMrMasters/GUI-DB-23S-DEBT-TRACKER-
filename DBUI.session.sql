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

CREATE TABLE payments (
  payment_id INT NOT NULL AUTO_INCREMENT,
  payment_request_id INT NOT NULL,
  payment_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (payment_id),
  FOREIGN KEY (payment_request_id) REFERENCES payment_requests(payment_request_id)
);



INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('uKpKfLzFEQ', 'EUVFuDfRZG', 'ibRXdsdnrm', 'nobZoUauVQ', 36, 0, 'qLTMt', '9153190075', 'xwidXzSbfG@example.com');
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('FtFzchGhPB', 'iKEij5YwcC', 'EbpfwOkqsM', 'WynraTDIGP', 63, 1, 'XhgzF', '5513469079', 'hvYeVRGQhr@example.com');
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('WeoRAohHwH', 'QyLNf0Zzu5', 'XIeelSUWGS', 'ufOKpRRDIy', 64, 0, 'cxtiv', '6594824546', 'YSCNjtYsyj@example.com');
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('uoWaODdpbE', 'FL9IaxYdnQ', 'BvuLqSaWsp', 'JhCBONYygr', 36, 0, 'yEbHC', '2326719532', 'DSrVGzdkPt@example.com');
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('XQdqxhMzZZ', 'bnAMzXP9m7', 'KzOsbkWXBx', 'lkeDQjrqdb', 51, 0, 'BEHaH', '9662710697', 'gwHkfrVlEd@example.com');
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('TuqmKjWwcc', '36VaWsVYKi', 'bZqOUGCMyQ', 'sABqoNjrUc', 40, 0, 'EsusA', '6585341734', 'lpAOWuFUXm@example.com');
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('pqNplSgBeI', '5krS0uPpFj', 'TjxILSEyoG', 'DCHguxGtBc', 43, 1, 'wqMtC', '5271953086', 'JEAxcXNSmQ@example.com');
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('zUErPrZCiG', 'tWNgOcChcv', 'ddcrxDGPJi', 'BVdRrymojG', 46, 0, 'zIxCo', '0706041981', 'WeOZaYyWoy@example.com');
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('ULZLlBfubt', '0PMaI22Rj2', 'BvOqTriaQD', 'jAOJCNUqqd', 28, 0, 'XBTIs', '3615169300', 'HYQAzpDpHJ@example.com');
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('WQJECowpbf', 'CQZ2qcmF1u', 'LktYydkTBA', 'FSCsjFxhpB', 48, 1, 'IXlTH', '8995759790', 'wwalHKQELw@example.com');
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email) VALUES ('UNmMFqxuIA', '01k58rD7j1', 'qEWwxMYGbv', 'FunUqrTApa', 36, 1, 'Uycxq', '8827810981', 'XTewabDQoR@example.com');