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
  password: "raferafe",
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

});
//add an expected payment
app.post("/add_expected_payment/", (req, res) => {
        const {
          expected_payment_id,
          lender_id,
          debtor_id,
          payment_deadline,
          payment_amount,
      } = req.body;
      const query = `INSERT INTO expected_payments (expected_payment_id, lender_id, debtor_id, payment_deadline, payment_amount) VALUES ('${expected_payment_id}','${lender_id}','${debtor_id}','${payment_deadline}','${payment_amount}')`;
      connection.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.status(200);
        res.send("Successfully added expected payment!");
      });
});
app.get("/balance", (req, res) => {
  connection.query(`SELECT * FROM balance`, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.send(rows);
  });
});
app.get("/balance_id"), (req, res) => {
  const {
    balance_id,
} = req.body;
  connection.query(`SELECT * FROM balance WHERE balance_id = ?`,
  [balance_id],
  (err, results, fields) => {
    if (err) throw err;
    if (results.length > 0) {
      var balance = results[0];
      res.status(200);
      res.send(balance);
    } else {
      res.status(401);
      res.send("Balance not found");
    }
    res.status(200);
    res.send(rows);
  });
};
app.post("/add_balance", (req,res) => {
      const {
        balance_id,
        amount
      } = req.body;
      const query = `INSERT INTO balance (balance_id,amount) VALUES ('${balance_id}','${amount}')`;
      connection.query(query, (err, rows, fields) => {
        if (err) throw err;
        res.status(200);
        res.send("Successfully added balance!");
      });

});
app.post("/balance/:blanace_id", (req,res) => {
    const {
      balance_id,
      amount
    } = req.body
    const query = `UPDATE balance SET balance_id = '${balance_id}', amount = '${amount}'`;
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;
  
      console.log(rows);
      res.status(200);
      res.send("Successfully updated balance!");
    });
});

app.get("/bocked_users", (req, res) => {
  connection.query(`SELECT * FROM blocked_users`, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.send(rows);
  });
});

app.get("/blocked_user/:id"), (req, res) => {
  const {
    user_id,
} = req.body;

  connection.query(`SELECT * FROM blocked_users WHERE user_id = ?`,
  [user_id],
  (err, results, fields) => {
    if (err) throw err;
    if (results.length > 0) {
      var balance = results[0];
      res.status(200);
      res.send(balance);
    } else {
      res.status(401);
      res.send("User not found");
    }
    res.status(200);
    res.send(rows);
  });


};
app.post("/add_blocked_user", (req,res) => {
  const {
    user_id,
    blocked_user_id
  } = req.body;
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = `INSERT INTO blocked_users (user_id,blocked_user_id,date) VALUES ('${user_id}','${blocked_user_id}', '${date}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send("Successfully added balance!");
  });

});
app.post("/blocked_user/:user_id", (req,res) => {

    const {
      user_id,
      blocked_user_id
    } = req.body
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = `UPDATE balance SET user_id = '${user_id}', blocked_user_id = '${blocked_user_id}', date = '${date}'`;
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;
  
      console.log(rows);
      res.status(200);
      res.send("Successfully updated blocked user!");
    });
});
app.get("/timeline", (req, res) => {
  connection.query(`SELECT * FROM timeline`, (err, rows, fields) => {
    if (err) throw err;

    res.status(200);
    res.send(rows);
  });
});
app.get("/timeline/:timeline_id"), (req, res) => {
  const {
    timeline_id,
} = req.body;

  connection.query(`SELECT * FROM timeline WHERE timeline_id = ?`,
  [timeline_id],
  (err, results, fields) => {
    if (err) throw err;
    if (results.length > 0) {
      var time = results[0];
      res.status(200);
      res.send(time);
    } else {
      res.status(401);
      res.send("Timeline not found");
    }
    res.status(200);
    res.send(rows);
  });
};
app.post("/add_timeline", (req,res) => {
  const {
    timeline_id,
    lender_id,
    debtor_id,
    payment_amount,
    payment_notes,

  } = req.body;
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const query = `INSERT INTO timeline (timeline_id,lender_id,debtor_id,date,payment_amounts,payment_notes) VALUES ('${timeline_id}','${lender_id}', '${debtor_id}', '${date}','${payment_amount}','${payment_notes}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.status(200);
    res.send("Successfully added timeline!");
  });

});



// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
