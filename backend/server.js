const express = require("express");
const app = express();
const port = 8000;

// Enable Cross-Origin Resource Sharing
const cors = require("cors");
app.use(cors()); // This has to be before any routes

// Enable JSON parsing
app.use(express.json());

// Connect to mysql
const mysql = require("mysql");
const { response } = require("express");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DBUI",
});

connection.connect();

// API routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.put("/parse", (req, res) => {
  console.log(req.body);

  try {
    const {
      user_id,
      username,
      first_name,
      last_name,
      age,
      admin,
      nickname,
      password,
      phone_number,
      email,
    } = req.body;
    const name = `${first_name} ${last_name}`;
    const isAdmin = admin ? "is an admin" : "is not an admin";

    res.status(200);
    res.send(`${name} is ${age} years old and ${isAdmin}`);
  } catch (err) {
    console.log(err);
  }
});

app.get("/db", (req, res) => {
  connection.query("SHOW TABLES", (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send(rows);
  });
});

app.post("/user", (req, res) => {
  const {
    user_id,
    username,
    first_name,
    last_name,
    age,
    admin,
    nickname,
    password,
    phone_number,
    email,
  } = req.body;
  const query = `INSERT INTO users (user_id, username, first_name, last_name, age, admin, nickname, password, phone_number, email ) VALUES ('${user_id}','${username}','${first_name}', '${last_name}', ${age}, ${admin},'${nickname}', '${password}', '${phone_number}','${email}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully added user!");
  });
});

app.get("/users", (req, res) => {
  connection.query(`SELECT * FROM users`, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.send(rows);
  });
});

app.put("/users/clear", (req, res) => {
  connection.query(`DELETE FROM users`, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.send("Successfully cleared users!");
  });
});

app.post("/register", (req, res) => {
  const {
    user_id,
    username,
    first_name,
    last_name,
    age,
    admin,
    nickname,
    password,
    phone_number,
    email,
  } = req.body;
  const query = `INSERT INTO users (username, first_name, last_name, age, admin, nickname, password, phone_number, email ) VALUES ('${username}','${first_name}', '${last_name}', ${age}, ${admin},'${nickname}', '${password}', '${phone_number}','${email}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully added user!");
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      console.log(results);
      if (results.length > 0) {
        var user = results[0];
        console.log(user);
        console.log("Logged in as:", user.first_name);
        res.status(200);
        res.send(user);
      } else {
        console.log("Invalid username or password");
        res.status(401);
        res.send("Invalid username or password");
      }
    }
  );
});

app.post("/getuser", (req, res) => {
  const { username } = req.body;
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      console.log(results);
      if (results.length > 0) {
        var user = results[0];
        console.log(user);
        console.log("Returning user:", user.first_name);
        res.status(200);
        res.send(user);
      } else {
        console.log("User not found");
        res.status(401);
        res.send("User not found");
      }
    }
  );
});

app.post("/edit/:id", (req, res) => {
  var id = req.params.id;
  const {
    username,
    first_name,
    last_name,
    age,
    admin,
    nickname,
    password,
    phone_number,
    email,
  } = req.body;
  const query = `UPDATE users SET username = '${username}', first_name = '${first_name}', last_name = '${last_name}', age = '${age}', admin = '${admin}', nickname = '${nickname}', password = '${password}', phone_number = '${phone_number}', email =  '${email}' WHERE user_id = '${id}'`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully updated user!");
  });
});
//get all expected payments
app.get("/expected_payments", (req,res) => {
    const {
    } = req.body;
    connection.query(`SELECT * FROM expected_payments`, (err, rows, fields) => {
      if (err) throw err;
  
      res.status(200);
      res.send(rows);
    });

});
//get specific expected payment with expected_payment_id as key
app.get("/expected_payment", (req,res) => {
  const {
      expected_payment_id,
  } = req.body;
  connection.query(`SELECT * FROM expected_payments WHERE expected_payment_id = ?`, 
  [expected_payment_id],
  (err, results, fields) => {
    if (err) throw err;
    if (results.length > 0) {
      var payment = results[0];
      res.status(200);
      res.send(payment);
    } else {
      res.status(401);
      res.send("Payment not found");
    }
    res.status(200);
    res.send(rows);
  });


app.post("/friend", (req, res) => {
  const { user1_id, user2_id } = req.body;
  const date_added = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = `INSERT INTO friends (user1_id, user2_id, date_added) VALUES (${user1_id}, ${user2_id}, '${date_added}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully added friend relationship!");
  });
});

app.get("/friends", (req, res) => {
  const query = "SELECT * FROM friends";
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.json(rows);
  });
});

app.get("/friends/:friend_id", (req, res) => {
  const { friend_id } = req.params;
  const query = `SELECT * FROM friends WHERE friend_id=${friend_id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    if (rows.length === 0) {
      res.status(404);
      res.send("Friend not found.");
    } else {
      res.status(200);
      res.json(rows[0]);
    }
  });
});


app.put("/friend/:friend_id", (req, res) => {
  const { friend_id } = req.params;
  const { user1_id, user2_id } = req.body;
  const date_added = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = `UPDATE friends SET user1_id=${user1_id}, user2_id=${user2_id}, date_added='${date_added}' WHERE friend_id=${friend_id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully updated friend relationship!");
  });
});

app.delete("/friend/:friend_id", (req, res) => {
  const { friend_id } = req.params;
  const query = `DELETE FROM friends WHERE friend_id=${friend_id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully deleted friend relationship!");
  });
});

app.post("/payment", (req, res) => {
  const { payment_request_id, payment_date, amount } = req.body;
  const query = `INSERT INTO payments (payment_request_id, payment_date, amount) VALUES (${payment_request_id}, '${payment_date}', ${amount})`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully added payment!");
  });
});

app.get("/payments", (req, res) => {
  const query = "SELECT * FROM payments";
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.json(rows);
  });
});

app.put("/payment/:payment_id", (req, res) => {
  const { payment_id } = req.params;
  const { payment_request_id, payment_date, amount } = req.body;
  const query = `UPDATE payments SET payment_request_id=${payment_request_id}, payment_date='${payment_date}', amount=${amount} WHERE payment_id=${payment_id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully updated payment!");
  });
});

app.delete("/payment/:payment_id", (req, res) => {
  const { payment_id } = req.params;
  const query = `DELETE FROM payments WHERE payment_id=${payment_id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully deleted payment!");
  });
});

app.post("/friend-request", (req, res) => {
  const { sender_id, receiver_id } = req.body;
  const request_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const status = 'pending';
  const query = `INSERT INTO friend_requests (sender_id, receiver_id, request_date, status) VALUES (${sender_id}, ${receiver_id}, '${request_date}', '${status}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully added friend request!");
  });
});


app.get("/friend-requests", (req, res) => {
  const query = "SELECT * FROM friend_requests";
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.json(rows);
  });
});

app.put("/friend-request/:request_id", (req, res) => {
  const { request_id } = req.params;
  const { sender_id, receiver_id, status } = req.body;
  const request_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = `UPDATE friend_requests SET sender_id=${sender_id}, receiver_id=${receiver_id}, request_date='${request_date}', status='${status}' WHERE request_id=${request_id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully updated friend request!");
  });
});

app.delete("/friend-request/:request_id", (req, res) => {
  const { request_id } = req.params;
  const query = `DELETE FROM friend_requests WHERE request_id=${request_id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully deleted friend request!");
  });

});

app.post("/transaction", (req, res) => {
  const { sender_id, receiver_id, amount } = req.body;
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const status = 'pending';
  const query = `INSERT INTO transactions (sender_id, receiver_id, amount, date, status) VALUES (${sender_id}, ${receiver_id}, ${amount}, '${date}', '${status}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully added transaction!");
  });
});

app.get("/transactions", (req, res) => {
  const query = "SELECT * FROM transactions";
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.json(rows);
  });
});

app.put("/transaction/:transaction_id", (req, res) => {
  const { transaction_id } = req.params;
  const { sender_id, receiver_id, amount, status } = req.body;
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = `UPDATE transactions SET sender_id=${sender_id}, receiver_id=${receiver_id}, amount=${amount}, date='${date}', status='${status}' WHERE transaction_id=${transaction_id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);
    res.status(200);
    res.send("Successfully updated transaction!");
  });
});

app.get("/user/:user_id/transactions", (req, res) => {
  const { user_id } = req.params;
  const query = `SELECT * FROM transactions WHERE sender_id=${user_id} OR receiver_id=${user_id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.json(rows);
  });
});

app.get("/user/:user_id/transactions/:transaction_id", (req, res) => {
  const { user_id, transaction_id } = req.params;
  const query = `SELECT * FROM transactions WHERE (sender_id=${user_id} OR receiver_id=${user_id}) AND transaction_id=${transaction_id}`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;

    if (rows.length === 0) {
      res.status(404);
      res.send("Transaction not found.");
    } else {
      res.status(200);
      res.json(rows[0]);
    }
  });
});





// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
