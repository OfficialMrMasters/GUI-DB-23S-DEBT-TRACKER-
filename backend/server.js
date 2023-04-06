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
        const { 
                user_id, username, first_name, last_name, age, admin, 
                nickname, password, phone_number, email 
                } = req.body
        const name = `${first_name} ${last_name}`
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
    const { 
        user_id, username, first_name, last_name, age, admin, 
        nickname, password, phone_number, email 
        } = req.body
    const query = `INSERT INTO users (user_id, username, first_name, last_name, age, admin, nickname, password, phone_number, email ) VALUES ('${user_id}','${username}','${first_name}', '${last_name}', ${age}, ${admin},'${nickname}', '${password}', '${phone_number}','${email}')`
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
app.post('/signup', (req, res) => {
    const { 
        user_id, username, first_name, last_name, age, admin, 
        nickname, password, phone_number, email 
        } = req.body
    const query = `INSERT INTO users (username, first_name, last_name, age, admin, nickname, password, phone_number, email ) VALUES ('${username}','${first_name}', '${last_name}', ${age}, ${admin},'${nickname}', '${password}', '${phone_number}','${email}')`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send("Successfully added user!")
    })
})
app.post('/checkuser', (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        console.log(response);
        if (results.length > 0) {
            var user = results[0];
            console.log(user);
            console.log("Logged in as:", user.first_name);
          } else {
            console.log("Invalid username or password");
          }
          res.status(200)
          res.send(user)
    })
  })
// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})