const express = require('express');
const path = require('path');
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
// const document = require('document');
const bodyParser = require('body-parser');
var db = new sqlite3.Database(':memory:');
const app = express();
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true, parameterLimit: 100000000000 }));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
const db_name = path.join(__dirname, "fsdapp.db")
db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.log(err.message)
    }
    console.log('Database connected')
})
app.listen(3000, () => {
    console.log("Website running on port:3000");
});


const sql = `CREATE TABLE IF NOT EXISTS s20200010091(ts TIMESTAMP,name VARCHAR(255),gender VARCHAR(20),age INTEGER, satisfaction varchar(255),benefiting varchar(255));`;

db.run(sql, err => {
    if (err) {
        return console.log(err.message);
    }
    console.log('table created successfully');
})


app.get('/', (req, res) => {
    res.render('form');
})
app.get('/show', (req, res) => {
    const sql = 'SELECT * FROM s20200010091 order by name';
    db.all(sql, (err, rows) => {
        if (err) {
            return console.log(err.message);
        }
        res.render("show", { model: rows });
    })
})
app.post('/show', (req, res) => {
    const name = req.body.name;
    const gender = req.body.gender;
    const age = req.body.age;
    const satisfaction = req.body.satisfaction;
    const benefiting = req.body.benefiting;
    
    
    const query = "Insert into s20200010091 values (CURRENT_TIMESTAMP,?,?,?,?,?);";

    const result = [name, gender, age, satisfaction, benefiting]
    db.run(query, result, err => {
        if (err) {
            console.log(err.message)
        }
        res.redirect('/show')
    })
  
})



