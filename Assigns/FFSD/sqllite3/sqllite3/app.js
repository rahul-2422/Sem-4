const express = require('express');
const path = require('path'); 
var fs = require('fs')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');


const port = 8000;
const app = express();

const staticPath = path.join(__dirname, './public')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

app.use(express.json());
app.use(express.static(staticPath))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/addproject', (req, res) => {
    res.render('addProject')
})


const db_name = path.join(__dirname,"data","fsdapp.db")
const db_name1 = path.join(__dirname,"data","fsdapp1.db")

db =new sqlite3.Database(db_name,err=>{
    if(err){
        return console.log(err.message)
    }
    console.log('Database connected')
})

db1 =new sqlite3.Database(db_name1,err=>{
    if(err){
        return console.log(err.message)
    }
    console.log('Database connected')
})

const oS20200010154 =`CREATE TABLE IF NOT EXISTS S20200010154(
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    S20200010154projectname VARCHAR(100) NOT NULL,
    S20200010154rollNo VARCHAR(100) NOT NULL,
    S20200010154semester VARCHAR(100) NOT NULL,
    S20200010154projectDetails VARCHAR(100) NOT NULL,
    S20200010154techused VARCHAR(100) NOT NULL
);`;

db.run(oS20200010154, err=>{
    if(err){
       return console.log(err.message)
    }
    console.log('TABLE CREATED')
})


app.post('/addproject', (req, res) => {
    // console.log(req.body);
    const projectName = req.body.projectname
    const rollNo = req.body.rollno
    const semester = req.body.semester
    const projectDetails = req.body.projectdetails
    const techUsed = req.body.techused
    
    const query = "Insert into S20200010154(S20200010154projectname, S20200010154rollNo, S20200010154semester, S20200010154projectDetails, S20200010154techused) values (?,?,?,?,?)"
    const project = [projectName, rollNo, semester, projectDetails, techUsed];
    db.run(query, project,err=>{
        if(err){
            console.log(err.message)
        }
        res.redirect('/allProjects')
    })
})

app.get('/allProjects', (req, res)=>{
    const sql="select * from S20200010154 order by uid";
    db.all(sql,(err,rows)=>{
        if(err){
            return console.log(err.message);
        }
        res.render("allProjects",{model: rows});
    })    
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});