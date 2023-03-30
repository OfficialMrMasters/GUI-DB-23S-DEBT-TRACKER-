const express = require('express')
const app = express()
const port = 8000

// Enable Cross-Origin Resource Sharing
const cors = require('cors')
app.use(cors()) // This has to be before any routes

// Enable JSON parsing
app.use(express.json())

// Connect to mysql
const mysql = require('mysql')
const { response } = require('express')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'raferafe',
  database: 'DBUI'
})

connection.connect()

// API routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.put('/parse', (req, res) => {
    console.log(req.body)
    
    try {
        const { first, last, age, admin, user_login, user_pass } = req.body
        const name = `${first} ${last}`
        const isAdmin = admin ? "is an admin" : "is not an admin"

        res.status(200)
        res.send(`${name} is ${age} years old and ${isAdmin}`)
    } catch (err) {
        console.log(err)
    }
})

app.get('/db', (req, res) => {
    connection.query('SHOW TABLES', (err, rows, fields) =>{
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(rows)
    })
})

app.post('/user', (req, res) => {
    const { first, last, age, admin, user_login, user_pass } = req.body
    const query = `INSERT INTO users (first_name, last_name, age, admin, user_login, user_pass) VALUES ('${first}', '${last}', ${age}, ${admin}, '${user_login}', '${user_pass}')`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send("Successfully added user!")
    })
})

app.get('/users', (req, res) => {
    connection.query(`SELECT * FROM users`, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send(rows)
    })
})

app.put('/users/clear', (req, res) => {
    connection.query(`DELETE FROM users`, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send("Successfully cleared users!")
    })
})
app.post('/checkuser', (req, res) => {
    console.log("!!!!!!!!!");
    const { username, password } = req.body;
    connection.query('SELECT * FROM users WHERE user_login = ? AND user_pass = ?', [username, password], (err, results) => {
        console.log(response);
        if (results.length > 0) {
            var user = results[0];
            console.log(user);
            console.log("Logged in as:", user.first_name);
          } else {
            console.log("Invalid username or password");
          }
          res.send(200)
          res.send(user)
    })
  })
// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})