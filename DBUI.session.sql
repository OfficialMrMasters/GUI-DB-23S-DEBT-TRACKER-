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
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('FtFzchGhPB', 'iKEij5YwcC', 'EbpfwOkqsM', 'WynraTDIGP', 63, 1, 'XhgzF', '5513469079', 'hvYeVRGQhr@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('WeoRAohHwH', 'QyLNf0Zzu5', 'XIeelSUWGS', 'ufOKpRRDIy', 64, 0, 'cxtiv', '6594824546', 'YSCNjtYsyj@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('uKpKfLzFEQ', 'EUVFuDfRZG', 'ibRXdsdnrm', 'nobZoUauVQ', 36, 0, 'qLTMt', '9153190075', 'xwidXzSbfG@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('uoWaODdpbE', 'FL9IaxYdnQ', 'BvuLqSaWsp', 'JhCBONYygr', 36, 0, 'yEbHC', '2326719532', 'DSrVGzdkPt@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('XQdqxhMzZZ', 'bnAMzXP9m7', 'KzOsbkWXBx', 'lkeDQjrqdb', 51, 0, 'BEHaH', '9662710697', 'gwHkfrVlEd@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('TuqmKjWwcc', '36VaWsVYKi', 'bZqOUGCMyQ', 'sABqoNjrUc', 40, 0, 'EsusA', '6585341734', 'lpAOWuFUXm@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('pqNplSgBeI', '5krS0uPpFj', 'TjxILSEyoG', 'DCHguxGtBc', 43, 1, 'wqMtC', '5271953086', 'JEAxcXNSmQ@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('zUErPrZCiG', 'tWNgOcChcv', 'ddcrxDGPJi', 'BVdRrymojG', 46, 0, 'zIxCo', '0706041981', 'WeOZaYyWoy@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('ULZLlBfubt', '0PMaI22Rj2', 'BvOqTriaQD', 'jAOJCNUqqd', 28, 0, 'XBTIs', '3615169300', 'HYQAzpDpHJ@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('WQJECowpbf', 'CQZ2qcmF1u', 'LktYydkTBA', 'FSCsjFxhpB', 48, 1, 'IXlTH', '8995759790', 'wwalHKQELw@example.com', 0);
INSERT INTO users (username, password, first_name, last_name, age, admin, nickname, phone_number, email, setPrivate) VALUES ('UNmMFqxuIA', '01k58rD7j1', 'qEWwxMYGbv', 'FunUqrTApa', 36, 1, 'Uycxq', '8827810981', 'XTewabDQoR@example.com', 0);
