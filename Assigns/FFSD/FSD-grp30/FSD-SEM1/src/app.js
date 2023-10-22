const express = require('express')
require('./db/conn')
const User = require('./models/users')
const path = require('path')
const hbs = require('hbs')
const port = process.env.PORT || 8000
const app = express()
const passport = require('passport')
require('../config/loginAuth')(passport);  
const session = require('express-session');
const { isAuthenticated } = require('../config/loginAuth')
require('../config/googleAuth')


const staticPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

app.use(express.json())  
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticPath))
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false
    })
  );
app.use(passport.initialize())
app.use(passport.session())



app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get("/", (req, res)=>{
    res.render('index', {name:''})
})

app.get('/user/:id',isAuthenticated, async(req, res)=>{
    const id = req.params.id 
    const tuple = await User.find({_id: id})
    const name = tuple[0].name
    res.render('index', {name: name})
})

app.get('/acc', isAuthenticated, (req, res) => {
    res.render('account')
})

app.get('/cart', (req, res) => {
    res.render('cart')
})

app.get('/wishlist', (req, res) => {
    res.render('wishlist')
})

app.get('/wishlistpage', (req, res) => {
    res.render('wishlistpage')
})

app.get('/watches', (req, res) => {
    res.render('watches')
})
app.get('/TV', (req, res) => {
    res.render('TV')
})
app.get('/mobiles', (req, res) => {
    res.render('mobiles')
})
app.get('/laptop', (req, res) => {
    res.render('laptop')
})



app.post("/", async(req, res)=>{
    const email = req.body.email
    const tuple = await User.find({email: email}) 
    const name = tuple[0].name 
    const broken = name.split(' ')
    res.render('index', {name: broken[0]})
})


app.post('/register', async(req, res)=>{
    try {
        console.log(req.body.password);  
        const logNewUser = new User({
            name: req.body.name,
            email: req.body.email,
            phoneNumber : req.body.number,
            password: req.body.password,
            loginType: 'normal'
        })
        const confirm = await logNewUser.save()
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/register', async(req, res)=>{

    try {
        const allUsers = await User.find();
        res.status(200).send(allUsers);
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/product', async(req, res) => {
    res.render('product')
})

app.get('/login', async(req, res) => {
    res.render('login')
})

app.get('/payment', async(req, res) => {
    res.render('payment')
})


app.post('/login', async(req, res, next) => {
    const userTuple = await User.findOne({ email:req.body.email})
    passport.authenticate('local', {
      successRedirect: `/user/${userTuple._id}`,
      failureRedirect: '/login',
    })(req, res, next);
});

app.get('/signup', (req, res)=>{
    res.render('signup')
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/google', 
    passport.authenticate('google', {scope: ['profile'] }),
)

app.get('/google/callback',
    passport.authenticate
    (
        'google', 
        {
            failureRedirect: 'http://localhost:8000/login',
        }
    ),
    (req, res) => {
        console.log(req.user.name.givenName);
        res.render('index', {name: req.user.name.givenName})
    }
)

app.get('/orders', (req, res)=>{
    res.render('myorders')
})

app.get('/editDetails', (req, res)=>{
    res.render('editDetails')
})

app.listen(port, (req, res) => {
    console.log(`Connection live at ${port}`)
})
