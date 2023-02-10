const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Harjeet1',
    database: "employeeSystem",
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
        [name, age, country, position, wage], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted") //Send message that our values got inserted 
            }
        }
    );
}); // insert data into database

app.get('/employees', (req, res)  => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    });
});

app.listen(3001, () => {
    console.log("yay, it is working");
});

