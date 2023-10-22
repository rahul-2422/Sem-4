const express = require("express");
const app = express();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shrahul@2422",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views/public"));


app.get('/', (req, res) => {
    res.render('home')
})
app.get('/details', (req, res) => {
  res.render('details')
})
app.get('/contact', (req, res) => {
  res.render('contact')
})
app.post('/display',(req,res)=>{

    const pname = req.body.S20200010091projectname;
    const rollno = req.body.S20200010091rollno;
    const semester = req.body.S20200010091semster;
    const details = req.body.S20200010091projectdetails;
    const technology = req.body.S20200010091technology;

      con.query("use fsd");
        if(pname!=""&&rollno!=""&&semester!=""&&details!=""&&technology!=""){
          con.query(
            "INSERT INTO S20200010091 VALUES("+"'"+pname+"'"+","+"'"+rollno+"'"+","+"'"+semester+"'"+","+"'"+details+"'"+","+"'"+technology+"'"+")",
            function (err, result) {
              if (err) throw err;
              console.log("data added");
            }
          );
          con.query('SELECT * FROM S20200010091', function (err, data, fields) {
            if (err) throw err;
            res.render('display', { title: 'User List', userData: data});
          });
        }
})
app.get('/view',(req,res)=>{
    con.query("use fsd");
        con.query('SELECT * FROM S20200010091', function (err, data, fields) {
          if (err) throw err;
          res.render('display', { title: 'User List', userData: data});
        });
})
app.listen(3000, () => {
    console.log("Website running on port:3000")
})
